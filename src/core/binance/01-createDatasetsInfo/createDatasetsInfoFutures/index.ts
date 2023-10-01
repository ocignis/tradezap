import { DatasetsInfo } from '..';
import { DatasetBinanceFutures } from '../../types';

type createDatasetsInfoFuturesParams = {
  dataset: DatasetBinanceFutures;
  pathOutputDirectory: string;
};

// TODO: Implement futures datasets
export const createDatasetsInfoFutures = ({
  dataset,
  pathOutputDirectory,
}: createDatasetsInfoFuturesParams): DatasetsInfo => {
  console.log('🔎 Log ~ dataset:', dataset);

  console.log('🔎 Log ~ pathOutputDirectory:', pathOutputDirectory);

  return [];
};
