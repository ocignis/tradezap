import { DatasetsInfo } from '..';
import { DatasetBinanceOption } from '../../types';

type createDatasetsInfoOptionParams = {
  dataset: DatasetBinanceOption;
  pathOutputDirectory: string;
};

// TODO: Implement option datasets
export const createDatasetsInfoOption = ({
  dataset,
  pathOutputDirectory,
}: createDatasetsInfoOptionParams): DatasetsInfo => {
  console.log('🔎 Log ~ dataset:', dataset);

  console.log('🔎 Log ~ pathOutputDirectory:', pathOutputDirectory);

  return [];
};
