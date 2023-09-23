import { mkdir } from 'fs/promises';

import AdmZip from 'adm-zip';

import { calculateTimeSpan, log } from 'utils';

import { DatasetsInfo } from '../01-createDatasetsInfo';

type ProcessDatasetsParams = {
  datasetsInfo: DatasetsInfo;
};

export const processDatasets = async ({ datasetsInfo }: ProcessDatasetsParams): Promise<void> => {
  const startTime = performance.now();
  let numOfDatasetsDownloaded = 0;

  const datasetsPromises = datasetsInfo.map(async ({ datasetUrl, targetPath, targetFolder }) => {
    const file = await fetch(datasetUrl);
    await mkdir(targetFolder, { recursive: true });
    await Bun.write(targetPath, file);

    const admZip = new AdmZip(targetPath);
    // const admZip = new AdmZip(file);

    admZip.extractAllTo(targetFolder, true);

    // await fs.remove(targetPath);

    numOfDatasetsDownloaded++;

    log.info(`Downloading... ${numOfDatasetsDownloaded}/${datasetsInfo.length}`);
  });

  await Promise.all(datasetsPromises);

  const endTime = performance.now();
  log.success(`Download complete (${calculateTimeSpan({ startTime, endTime })})`);
};
