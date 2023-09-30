import { DatasetsBinance } from '../types';

import { createDatasetsInfoSpot } from './createDatasetsInfoSpot';

type CreateDatasetsInfoParams = {
  datasets: DatasetsBinance;
  pathOutputDirectory: string;
};

export type DatasetInfo = {
  datasetUrl: string;
  targetPath: string;
  targetFolder: string;
  datasetFilename: string;
};

export type DatasetsInfo = ReadonlyArray<DatasetInfo>;

export const createDatasetsInfo = ({ datasets, pathOutputDirectory }: CreateDatasetsInfoParams): DatasetsInfo => {
  const datasetsInfo = datasets.flatMap((dataset) => {
    switch (dataset.asset) {
      case 'spot':
        const datasetsInfoSpot = createDatasetsInfoSpot({ dataset, pathOutputDirectory });
        return datasetsInfoSpot;

      // TODO: Implement futures  datasets
      case 'futures':
        return [];

      // TODO: Implement  option datasets
      case 'option':
        return [];
    }
  });

  return datasetsInfo;
};
