import { log, calculateTimeSpan } from 'utils';

import TemporaryDefaultImport from '../../../example/binance/tradezap.config';

import { createDatasetsDownloadInfo } from './01-createDatasetsDownloadInfo';
import { downloadDatasets } from './02-downloadDatasets';

type DownloadDataParams = {
  pathConfigFile: string;
  pathOutputDirectory: string;
};

export const downloadData = async ({ pathConfigFile, pathOutputDirectory }: DownloadDataParams) => {
  const startTime = performance.now();

  // TODO: Extract default export from config file
  console.log('🔎 Log ~ downloadData ~ pathConfigFile:', pathConfigFile);

  const datasetsDownloadInfo = createDatasetsDownloadInfo({
    datasets: TemporaryDefaultImport,
    pathOutputDirectory,
  });

  console.log('🔎 Log ~ downloadData ~ datasetsDownloadInfo:', datasetsDownloadInfo);

  await downloadDatasets({ datasetsDownloadInfo });

  // await unzipFiles({ tradesDataDownloadInfo });

  const endTime = performance.now();
  log.success(`Completed (${calculateTimeSpan({ startTime, endTime })})`);
};
