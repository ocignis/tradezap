import type { DatasetsBinance } from '../types';

// import { createDatasetsInfoFutures } from './createDatasetsInfoFutures';
// import { createDatasetsInfoOption } from './createDatasetsInfoOption';
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

      case 'futures':
        throw new Error(`Asset '${dataset.asset}' is not implemented yet`);

      // const datasetsInfoFutures = createDatasetsInfoFutures({ dataset, pathOutputDirectory });
      // return datasetsInfoFutures;

      case 'option':
        throw new Error(`Asset '${dataset.asset}' is not implemented yet`);

      // const datasetsInfoOption = createDatasetsInfoOption({ dataset, pathOutputDirectory });
      // return datasetsInfoOption;
    }
  });

  return datasetsInfo;
};
