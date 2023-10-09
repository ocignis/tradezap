import { mkdir } from 'fs/promises';

import AdmZip from 'adm-zip';

import { log } from 'common/utils';

import { DatasetsInfo } from '../01-createDatasetsInfo';

type ProcessDatasetsParams = {
  shouldUnzipDatasets: boolean;
  datasetsInfo: DatasetsInfo;
};

export const processDatasets = async ({ shouldUnzipDatasets, datasetsInfo }: ProcessDatasetsParams): Promise<void> => {
  let numOfDatasetsDownloaded = 0;

  const processedDatasetsPromises = datasetsInfo.map(
    async ({ datasetUrl, targetPath, targetFolder, datasetFilename }) => {
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

      numOfDatasetsDownloaded++;

      log.info(`Processing... ${numOfDatasetsDownloaded}/${datasetsInfo.length}`);
    },
  );

  const processedDatasets = await Promise.all(processedDatasetsPromises);
  const processedDatasetsNotFound = processedDatasets.filter(Boolean);

  if (processedDatasetsNotFound.length) {
    log.info(`${processedDatasetsNotFound.length} dataset files  couldn't be downloaded (not found):`);
    processedDatasetsNotFound.forEach((datasetNotFound) => log.info(`  • ${datasetNotFound}`));
  }
};
