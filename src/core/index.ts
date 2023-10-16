import { DEFAULT_PATH_OUTPUT_DIRECTORY, DEFAULT_SHOULD_UNZIP_DATASETS } from 'common/consts';
import { getTradezapConfig } from 'common/getTradezapConfig';
import { log, calculateTimeSpan } from 'common/utils';

import { createDatasetsInfo } from './binance/01-createDatasetsInfo';
import { processDatasets } from './binance/02-processDatasets';

type DownloadDataParams = {
  pathConfigFile: string;
  isRedownload: boolean;
  isVerbose: boolean;
};

export const downloadData = async ({ pathConfigFile, isRedownload, isVerbose }: DownloadDataParams) => {
  const startTime = performance.now();

  const tradezapConfig = await getTradezapConfig({ pathConfigFile });

  const tradezapConfigPromises = tradezapConfig.map(async (tradezapConfigProvider) => {
    switch (tradezapConfigProvider.provider) {
      case 'binance':
        const datasetsInfo = createDatasetsInfo({
          datasets: tradezapConfigProvider.datasets,
          pathOutputDirectory: tradezapConfigProvider.settings.outputDirectory ?? DEFAULT_PATH_OUTPUT_DIRECTORY,
        });

        await processDatasets({
          isRedownload,
          isVerbose,
          shouldUnzipDatasets: tradezapConfigProvider.settings.shouldUnzipDatasets ?? DEFAULT_SHOULD_UNZIP_DATASETS,
          datasetsInfo,
        });

        break;
    }
  });

  await Promise.all(tradezapConfigPromises);

  const endTime = performance.now();
  log.success(`Completed (${calculateTimeSpan({ startTime, endTime })})`);
};
