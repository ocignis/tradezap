import { mkdir } from 'fs/promises';

import AdmZip from 'adm-zip';

import { log } from 'common/utils';

import { DatasetsInfo } from '../01-createDatasetsInfo';

type ProcessDatasetsParams = {
  isRedownload: boolean;
  isVerbose: boolean;
  shouldUnzipDatasets: boolean;
  datasetsInfo: DatasetsInfo;
};

export const processDatasets = async ({
  isRedownload,
  isVerbose,
  shouldUnzipDatasets,
  datasetsInfo,
}: ProcessDatasetsParams): Promise<void> => {
  const processStats = {
    numProcessed: 0,
    numFilesDownloaded: 0,
    numFilesSkipped: 0,
  };

  const processedDatasetsPromises = datasetsInfo.map(
    async ({ datasetUrl, targetPath, targetFolder, datasetFilename }) => {
      if (!isRedownload) {
        const targetPathWithFinalExtension = shouldUnzipDatasets ? targetPath.replace('.zip', '.csv') : targetPath;

        const doesDownloadedDatasetFileExist = await Bun.file(targetPathWithFinalExtension).exists();

        if (doesDownloadedDatasetFileExist) {
          processStats.numProcessed++;
          processStats.numFilesSkipped++;

          log.info(`Processing... ${processStats.numProcessed}/${datasetsInfo.length}`);
          return;
        }
      }

      const response = await fetch(datasetUrl);

      if (response.status === 404) {
        return datasetFilename;
      }

      await mkdir(targetFolder, { recursive: true });

      if (shouldUnzipDatasets) {
        const fileArrayBuffer = await response.arrayBuffer();
        const fileBuffer = Buffer.from(fileArrayBuffer);

        const admZip = new AdmZip(fileBuffer);

        admZip.extractAllTo(targetFolder, true);
      } else {
        // Opened issue - https://github.com/oven-sh/bun/issues/5970
        // await Bun.write(targetPath, file);
        const fileBlob = await response.blob();
        await Bun.write(targetPath, fileBlob);
      }

      processStats.numProcessed++;
      processStats.numFilesDownloaded++;

      log.info(`Processing... ${processStats.numFilesDownloaded}/${datasetsInfo.length}`);
    },
  );

  const processedDatasets = await Promise.all(processedDatasetsPromises);
  const processedDatasetsNotFound = processedDatasets.filter(Boolean);

  log.info(`Processed ${processStats.numProcessed}/${datasetsInfo.length} dataset files.`);
  if (isVerbose) {
    log.info(`  • ${processStats.numFilesDownloaded} downloaded`);
    log.info(`  • ${processStats.numFilesSkipped} skipped`);
  }

  if (processedDatasetsNotFound.length) {
    log.info(`${processedDatasetsNotFound.length} dataset files  couldn't be downloaded (not found):`);

    if (isVerbose) {
      processedDatasetsNotFound.forEach((datasetNotFound) => log.info(`  • ${datasetNotFound}`));
    }
  }
};
