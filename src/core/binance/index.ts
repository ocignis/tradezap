import { log, calculateTimeSpan } from 'utils';

import TemporaryDefaultImport from '../../../example/binance/tradezap.config';

import { initOutputDirectory } from './01-initOutputDirectory';
import { createDatasetsDownloadInfo } from './02-createDatasetsDownloadInfo';
import { downloadDatasets } from './03-downloadDatasets';

type DownloadDataParams = {
  pathConfigFile: string;
  pathOutputDirectory: string;
};

export const downloadData = async ({ pathConfigFile, pathOutputDirectory }: DownloadDataParams) => {
  const startTime = performance.now();

  await initOutputDirectory(pathOutputDirectory);

  // TODO: Extract default export from config file
  console.log('🔎 Log ~ downloadData ~ pathConfigFile:', pathConfigFile);

  const datasetsDownloadInfo = createDatasetsDownloadInfo({
    datasets: TemporaryDefaultImport,
    pathOutputDirectory,
  });

  await downloadDatasets({ datasetsDownloadInfo });

  // const tradesDataDownloadInfo = makeTradesDataDownloadInfo({ downloadSymbolPairs: DOWNLOAD_SYMBOL_PAIRS });
  // const makeTradesDataDownloadInfoTime = performance.now();
  // logger.info(
  //   `makeTradesDataDownloadInfo - ${calculateTimeSpan({
  //     startTime: initRootFolderTime,
  //     endTime: makeTradesDataDownloadInfoTime,
  //   })}`,
  // );

  // await downloadTradesFiles({ tradesDataDownloadInfo });
  // const downloadTradesFilesTime = performance.now();
  // logger.info(
  //   `downloadTradesFiles - ${calculateTimeSpan({
  //     startTime: makeTradesDataDownloadInfoTime,
  //     endTime: downloadTradesFilesTime,
  //   })}`,
  // );

  // await unzipTradesFiles({ tradesDataDownloadInfo });
  // const unzipTradesFilesTime = performance.now();
  // logger.info(
  //   `unzipTradesFiles - ${calculateTimeSpan({ startTime: downloadTradesFilesTime, endTime: unzipTradesFilesTime })}`,
  // );

  const endTime = performance.now();
  log.success(`Completed (${calculateTimeSpan({ startTime, endTime })})`);
};
