import { DatasetsBinance } from '../types';

type CreateDatasetsInfoParams = {
  datasets: DatasetsBinance;
  pathOutputDirectory: string;
};

type DatasetDownloadInfo = {
  datasetUrl: string;
  targetPath: string;
  targetFolder: string;
  datasetFilename: string;
};

export type DatasetsInfo = ReadonlyArray<DatasetDownloadInfo>;

const BASE_URL = 'https://data.binance.vision/data/spot/monthly/trades';

export const createDatasetsInfo = ({ datasets, pathOutputDirectory }: CreateDatasetsInfoParams): DatasetsInfo => {
  const datasetsInfoNested = datasets.map(({ tradingPair, timeSpans }) => {
    const tradingPairFormatted = tradingPair.replace('-', '');

    return timeSpans.map(({ years, months }) =>
      months.map((month) => {
        const monthFormatted = String(month).padStart(2, '0');

        const datasetFilename = `${tradingPairFormatted}-trades-${years.at(0)}-${monthFormatted}.zip`;

        const datasetUrl = `${BASE_URL}/${tradingPairFormatted}/${datasetFilename}`;

        const targetPath = `${pathOutputDirectory}/${tradingPairFormatted}/${datasetFilename}`;

        const targetFolder = `${pathOutputDirectory}/${tradingPairFormatted}`;

        const datasetDownloadInfo: DatasetDownloadInfo = { datasetUrl, targetPath, targetFolder, datasetFilename };

        return datasetDownloadInfo;
      }),
    );
  });

  const datasetsInfo = datasetsInfoNested.flat(3);

  return datasetsInfo;
};
