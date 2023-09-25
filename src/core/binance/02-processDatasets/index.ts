import { mkdir } from 'fs/promises';

import AdmZip from 'adm-zip';

import { log } from 'utils';

import { DatasetsInfo } from '../01-createDatasetsInfo';

type ProcessDatasetsParams = {
  datasetsInfo: DatasetsInfo;
};

export const processDatasets = async ({ datasetsInfo }: ProcessDatasetsParams): Promise<void> => {
  let numOfDatasetsDownloaded = 0;

  const processingDatasetsPromises = datasetsInfo.map(async ({ datasetUrl, targetPath, targetFolder }) => {
    const file = await fetch(datasetUrl);
    await mkdir(targetFolder, { recursive: true });
    // Opened issue - https://github.com/oven-sh/bun/issues/5970
    // await Bun.write(targetPath, file);
    const fileBlob = await file.blob();
    await Bun.write(targetPath, fileBlob);

    const admZip = new AdmZip(targetPath);
    // const admZip = new AdmZip(file);

    admZip.extractAllTo(targetFolder, true);

    // await fs.remove(targetPath);

    numOfDatasetsDownloaded++;

    log.info(`Processing... ${numOfDatasetsDownloaded}/${datasetsInfo.length}`);
  });

  await Promise.all(processingDatasetsPromises);
};
