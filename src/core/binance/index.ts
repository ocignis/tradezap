import { DEFAULT_OUTPUT_DIRECTORY, DEFAULT_SHOULD_UNZIP_DATASETS } from 'common/consts';
import { log, calculateTimeSpan } from 'common/utils';

import TemporaryDefaultImport from '../../../example/binance/tradezap.config';

import { createDatasetsInfo } from './01-createDatasetsInfo';
import { processDatasets } from './02-processDatasets';

type DownloadDataParams = {
  pathConfigFile: string;
};

export const downloadData = async ({ pathConfigFile }: DownloadDataParams) => {
  const startTime = performance.now();

  // TODO: Extract default export from config file
  console.log('🔎 Log ~ downloadData ~ pathConfigFile:', pathConfigFile);

  const datasetsInfo = createDatasetsInfo({
    datasets: TemporaryDefaultImport.datasets,
    pathOutputDirectory: TemporaryDefaultImport.settings.outputDirectory ?? DEFAULT_OUTPUT_DIRECTORY,
  });

  await processDatasets({
    shouldUnzipDatasets: TemporaryDefaultImport.settings.shouldUnzipDatasets ?? DEFAULT_SHOULD_UNZIP_DATASETS,
    datasetsInfo,
  });

  const endTime = performance.now();
  log.success(`Completed (${calculateTimeSpan({ startTime, endTime })})`);
};
