import { BASE_URL } from '../consts';
import { DatasetsBinance } from '../types';

type CreateDatasetsInfoParams = {
  datasets: DatasetsBinance;
  pathOutputDirectory: string;
};

type DatasetInfo = {
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
        const { assetType, tradingPair, period, timeSpans } = dataset;

        const tradingPairFormatted = tradingPair.replace('-', '');

        const datasetsInfo = timeSpans.flatMap((timeSpan) =>
          timeSpan.months.map((month) => {
            const { years } = timeSpan;
            const monthFormatted = String(month).padStart(2, '0');

            const day = period === 'daily' && 'days' in timeSpan ? timeSpan.days.at(0) : null;
            const dayFormatted = String(day).padStart(2, '0');
            let datasetFilename = `${tradingPairFormatted}-${assetType}-${years.at(0)}-${monthFormatted}`;
            datasetFilename += day ? `-${dayFormatted}` : '';
            datasetFilename += '.zip';

            const datasetUrl = `${BASE_URL}/${dataset.asset}/${period}/${assetType}/${tradingPairFormatted}/${datasetFilename}`;

            const targetPath = `${pathOutputDirectory}/${tradingPairFormatted}/${datasetFilename}`;

            const targetFolder = `${pathOutputDirectory}/${tradingPairFormatted}`;

            const datasetInfo: DatasetInfo = { datasetUrl, targetPath, targetFolder, datasetFilename };

            return datasetInfo;
          }),
        );

        return datasetsInfo;

      case 'futures':
        return undefined;

      case 'option':
        return undefined;
    }
  });

  // Temporary filtering until futures and options are implemented.
  const datasetsInfoTemporary = datasetsInfo.filter(Boolean);

  return datasetsInfoTemporary;
};
