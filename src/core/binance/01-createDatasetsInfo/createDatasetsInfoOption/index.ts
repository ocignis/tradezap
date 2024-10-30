import type { DatasetsInfo } from '..';
import type { DatasetBinanceOption } from '../../types/option';

type CreateDatasetsInfoOptionParams = {
  dataset: DatasetBinanceOption;
  pathOutputDirectory: string;
};

// TODO: Implement option datasets
export const createDatasetsInfoOption = ({
  dataset,
  pathOutputDirectory,
}: CreateDatasetsInfoOptionParams): DatasetsInfo => {
  console.log('🔎 Log ~ dataset:', dataset);

  console.log('🔎 Log ~ pathOutputDirectory:', pathOutputDirectory);

  return [];
};
