import { DatasetInfo, DatasetsInfo } from '..';
import { BASE_URL } from '../../consts';
import { DatasetBinanceSpot } from '../../types/spot';

type createDatasetsInfoSpotParams = {
  dataset: DatasetBinanceSpot;
  pathOutputDirectory: string;
};

export const createDatasetsInfoSpot = ({
  dataset,
  pathOutputDirectory,
}: createDatasetsInfoSpotParams): DatasetsInfo => {
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
};
