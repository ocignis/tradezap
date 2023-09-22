import { DatasetsBinance } from '../types';

type CreateDatasetDownloadInfoParams = {
  datasets: DatasetsBinance;
  pathOutputDirectory: string;
};

type DatasetDownloadInfo = {
  datasetUrl: string;
  targetPath: string;
  targetFolder: string;
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

        const dataFileName = `${tradingPairFormatted}-trades-${year.at(0)}-${monthFormatted}.zip`;

        const datasetUrl = `${BASE_URL}/${tradingPairFormatted}/${dataFileName}`;

        const targetPath = `${pathOutputDirectory}/${tradingPairFormatted}/${dataFileName}`;

        const targetFolder = `${pathOutputDirectory}/${tradingPairFormatted}`;

        const datasetDownloadInfo: DatasetDownloadInfo = { datasetUrl, targetPath, targetFolder };

        return datasetDownloadInfo;
      }),
    );
  });

  const datasetsDownloadInfo = datasetsDownloadInfoNested.flat(3);

  return datasetsDownloadInfo;
};
