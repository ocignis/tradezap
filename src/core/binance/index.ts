import { DEFAULT_OUTPUT_DIRECTORY, DEFAULT_SHOULD_UNZIP_DATASETS } from 'common/consts';
import { getTradezapConfig } from 'common/getTradezapConfig';
import { log, calculateTimeSpan } from 'common/utils';

import { createDatasetsInfo } from './01-createDatasetsInfo';
import { processDatasets } from './02-processDatasets';

type DownloadDataParams = {
  pathConfigFile: string;
};

export const downloadData = async ({ pathConfigFile }: DownloadDataParams) => {
  const startTime = performance.now();

  const tradezapConfig = await getTradezapConfig({ pathConfigFile });

  tradezapConfig.map(async (tradezapConfigSingle) => {
    switch (tradezapConfigSingle.provider) {
      case 'binance':
        const datasetsInfo = createDatasetsInfo({
          datasets: tradezapConfigSingle.datasets,
          pathOutputDirectory: tradezapConfigSingle.settings.outputDirectory ?? DEFAULT_OUTPUT_DIRECTORY,
        });

        await processDatasets({
          shouldUnzipDatasets: tradezapConfigSingle.settings.shouldUnzipDatasets ?? DEFAULT_SHOULD_UNZIP_DATASETS,
          datasetsInfo,
        });

        break;

      default:
        // User input
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        log.error(`Provider "${tradezapConfigSingle.provider}" is not supported.`);
        break;
    }
  });

  const endTime = performance.now();
  log.success(`Completed (${calculateTimeSpan({ startTime, endTime })})`);
};
