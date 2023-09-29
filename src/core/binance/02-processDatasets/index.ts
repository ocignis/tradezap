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

  const processingDatasetsPromises = datasetsInfo.map(async ({ datasetUrl, targetPath, targetFolder }) => {
    const file = await fetch(datasetUrl);

    await mkdir(targetFolder, { recursive: true });

    if (shouldUnzipDatasets) {
      const fileArrayBuffer = await file.arrayBuffer();
      const fileBuffer = Buffer.from(fileArrayBuffer);

      const admZip = new AdmZip(fileBuffer);

      admZip.extractAllTo(targetFolder, true);
    } else {
      // Opened issue - https://github.com/oven-sh/bun/issues/5970
      // await Bun.write(targetPath, file);
      const fileBlob = await file.blob();
      await Bun.write(targetPath, fileBlob);
    }

    numOfDatasetsDownloaded++;

    log.info(`Processing... ${numOfDatasetsDownloaded}/${datasetsInfo.length}`);
  });

  await Promise.all(processingDatasetsPromises);
};
