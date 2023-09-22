import { DatasetsBinance } from '../types';

type CreateDatasetDownloadInfoParams = {
  datasets: DatasetsBinance;
  pathOutputDirectory: string;
};

type DatasetDownloadInfo = {
  datasetUrl: string;
  targetPath: string;
  targetFolder: string;
  datasetFilename: string;
};

export type DatasetsDownloadInfo = ReadonlyArray<DatasetDownloadInfo>;

const BASE_URL = 'https://data.binance.vision/data/spot/monthly/trades';

export const createDatasetsDownloadInfo = ({
  datasets,
  pathOutputDirectory,
}: CreateDatasetDownloadInfoParams): DatasetsDownloadInfo => {
  const datasetsDownloadInfoNested = datasets.map(({ tradingPair, timeSpans }) => {
    const tradingPairFormatted = tradingPair.replace('-', '');

    return timeSpans.map(({ year, months }) =>
      months.map((month) => {
        const monthFormatted = String(month).padStart(2, '0');

        const datasetFilename = `${tradingPairFormatted}-trades-${year.at(0)}-${monthFormatted}.zip`;

        const datasetUrl = `${BASE_URL}/${tradingPairFormatted}/${datasetFilename}`;

        const targetPath = `${pathOutputDirectory}/${tradingPairFormatted}/${datasetFilename}`;

        const targetFolder = `${pathOutputDirectory}/${tradingPairFormatted}`;

        const datasetDownloadInfo: DatasetDownloadInfo = { datasetUrl, targetPath, targetFolder, datasetFilename };

        return datasetDownloadInfo;
      }),
    );
  });

  const datasetsDownloadInfo = datasetsDownloadInfoNested.flat(3);

  console.log('🔎 Log ~ datasetsDownloadInfo:', datasetsDownloadInfo);

  return datasetsDownloadInfo;
};
