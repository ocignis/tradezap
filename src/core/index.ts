import { log, calculateTimeSpan } from 'utils';

import { initOutputDirectory } from './01-initOutputDirectory';

// import { DOWNLOAD_SYMBOL_PAIRS } from './DOWNLOAD_SYMBOL_PAIRS';
// import { downloadTradesFiles } from './downloadTradesFiles';
// import { initRootFolder } from './initRootFolder';
// import { makeTradesDataDownloadInfo } from './makeTradesDataDownloadInfo';
// import { unzipTradesFiles } from './unzipTradesFiles';

type DownloadDataParams = {
  pathConfigFile: string;
  pathOutputDirectory: string;
};

export const downloadData = async ({ pathConfigFile, pathOutputDirectory }: DownloadDataParams) => {
  log.info('Downloading trading data...');
  const startTime = performance.now();

  console.log('🔎 Log ~ downloadData ~ pathConfigFile:', pathConfigFile);

  await initOutputDirectory(pathOutputDirectory);

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
