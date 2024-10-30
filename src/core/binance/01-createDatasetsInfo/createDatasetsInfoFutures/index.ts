import type { DatasetsInfo } from '..';
import type { DatasetBinanceFutures } from '../../types/futures';

type CreateDatasetsInfoFuturesParams = {
  dataset: DatasetBinanceFutures;
  pathOutputDirectory: string;
};

// TODO: Implement futures datasets
export const createDatasetsInfoFutures = ({
  dataset,
  pathOutputDirectory,
}: CreateDatasetsInfoFuturesParams): DatasetsInfo => {
  console.log('🔎 Log ~ dataset:', dataset);

  console.log('🔎 Log ~ pathOutputDirectory:', pathOutputDirectory);

  return [];
};
