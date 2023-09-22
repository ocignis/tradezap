// import { Stream } from 'stream';

import fs from 'fs-extra';

import { calculateTimeSpan, log } from 'utils';

import { DatasetsDownloadInfo } from '../02-createDatasetsDownloadInfo';

type DownloadDatasetsParams = {
  datasetsDownloadInfo: DatasetsDownloadInfo;
};

export const downloadDatasets = async ({ datasetsDownloadInfo }: DownloadDatasetsParams): Promise<void> => {
  const startTime = performance.now();
  let numOfDatasetsDownloaded = 0;

  const tradesFilePromises = datasetsDownloadInfo.map(async ({ dataUrl, targetPath, targetFolder }) => {
    const result = await fetch(dataUrl);
    await fs.ensureDir(targetFolder);
    await Bun.write(targetPath, result);

    // const { data: fileData } = await axios.request<Stream>({
    //   method: 'GET',
    //   url: dataUrl,
    //   responseType: 'stream',
    // });

    // await fs.ensureDir(targetFolder);

    // await createFile(fileData, targetPath);

    numOfDatasetsDownloaded++;

    log.info(`Downloading - ${datasetsDownloadInfo.length}/${numOfDatasetsDownloaded}`);
  });

  await Promise.all(tradesFilePromises);

  const endTime = performance.now();
  log.success(`Downloaded all datasets (${calculateTimeSpan({ startTime, endTime })})`);
};

// const createFile = async (fileData: Stream, targetPath: string) => {
//   return new Promise<void>((resolve) => {
//     const writer = fs.createWriteStream(targetPath);

//     fileData.pipe(writer);

//     writer.on('finish', resolve);
//   });
// };
