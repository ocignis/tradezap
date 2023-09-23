import { mkdir } from 'fs/promises';

import { calculateTimeSpan, log } from 'utils';

import { DatasetsDownloadInfo } from '../02-createDatasetsDownloadInfo';

type DownloadDatasetsParams = {
  datasetsDownloadInfo: DatasetsDownloadInfo;
};

export const downloadDatasets = async ({ datasetsDownloadInfo }: DownloadDatasetsParams): Promise<void> => {
  const startTime = performance.now();
  let numOfDatasetsDownloaded = 0;

  const datasetsPromises = datasetsDownloadInfo.map(async ({ datasetUrl, targetPath, targetFolder }) => {
    const file = await fetch(datasetUrl);
    await mkdir(targetFolder, { recursive: true });
    await Bun.write(targetPath, file);

    numOfDatasetsDownloaded++;

    log.info(`Downloading... ${numOfDatasetsDownloaded}/${datasetsDownloadInfo.length}`);
  });

  await Promise.all(datasetsPromises);

  const endTime = performance.now();
  log.success(`Download complete (${calculateTimeSpan({ startTime, endTime })})`);
};
