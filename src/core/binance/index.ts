import { DEFAULT_OUTPUT_DIRECTORY, DEFAULT_SHOULD_UNZIP_DATASETS } from 'common/consts';
import { getProvidersConfig } from 'common/getProvidersConfig';
import { log, calculateTimeSpan } from 'common/utils';

import { createDatasetsInfo } from './01-createDatasetsInfo';
import { processDatasets } from './02-processDatasets';

type DownloadDataParams = {
  pathConfigFile: string;
};

export const downloadData = async ({ pathConfigFile }: DownloadDataParams) => {
  const startTime = performance.now();

  const providersConfig = await getProvidersConfig({ pathConfigFile });

  providersConfig.map(async (providerConfig) => {
    switch (providerConfig.provider) {
      case 'binance':
        const datasetsInfo = createDatasetsInfo({
          datasets: providerConfig.datasets,
          pathOutputDirectory: providerConfig.settings.outputDirectory ?? DEFAULT_OUTPUT_DIRECTORY,
        });

        await processDatasets({
          shouldUnzipDatasets: providerConfig.settings.shouldUnzipDatasets ?? DEFAULT_SHOULD_UNZIP_DATASETS,
          datasetsInfo,
        });

        break;

      default:
        // User input
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new Error(`Provider "${providerConfig.provider}" is not supported`);
    }
  });

  const endTime = performance.now();
  log.success(`Completed (${calculateTimeSpan({ startTime, endTime })})`);
};
