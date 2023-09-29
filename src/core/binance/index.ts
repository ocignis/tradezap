import { log, calculateTimeSpan } from 'common/utils';

import TemporaryDefaultImport from '../../../example/binance/tradezap.config';

import { createDatasetsInfo } from './01-createDatasetsInfo';
import { processDatasets } from './02-processDatasets';

type DownloadDataParams = {
  pathConfigFile: string;
  pathOutputDirectory: string;
};

export const downloadData = async ({ pathConfigFile, pathOutputDirectory }: DownloadDataParams) => {
  const startTime = performance.now();

  // TODO: Extract default export from config file
  console.log('🔎 Log ~ downloadData ~ pathConfigFile:', pathConfigFile);

  const datasetsInfo = createDatasetsInfo({
    datasets: TemporaryDefaultImport.datasets,
    pathOutputDirectory,
  });

  console.log('🔎 Log ~ downloadData ~ datasetsInfo:', datasetsInfo);

  await processDatasets({
    shouldUnzipDatasets: TemporaryDefaultImport.settings.shouldUnzipDatasets ?? true,
    datasetsInfo,
  });

  const endTime = performance.now();
  log.success(`Completed (${calculateTimeSpan({ startTime, endTime })})`);
};
