import { TimeSpan } from 'core/binance/types/common';
import { SpotAssetType } from 'core/binance/types/spot';

import { DatasetInfo, DatasetsInfo } from '..';
import { BASE_URL } from '../../consts';

type createDatasetsInfoSpotTimeSpanParams = {
  timeSpan: TimeSpan;
  pathOutputDirectory: string;
  tradingPair: string;
  assetType: SpotAssetType;
  asset: 'spot';
};

export const createDatasetsInfoSpotTimeSpan = ({
  timeSpan,
  pathOutputDirectory,
  tradingPair,
  assetType,
  asset,
}: createDatasetsInfoSpotTimeSpanParams): DatasetsInfo => {
  const { period } = timeSpan;

  const datasetsInfo = timeSpan.years.flatMap((year) =>
    timeSpan.months.map((month) => {
      const monthFormatted = String(month).padStart(2, '0');

      const day = period === 'daily' ? timeSpan.days.at(0) : null;
      const dayFormatted = String(day).padStart(2, '0');
      let datasetFilename = `${tradingPair}-${assetType}-${year}-${monthFormatted}`;
      datasetFilename += day ? `-${dayFormatted}` : '';
      datasetFilename += '.zip';

      const datasetUrl = `${BASE_URL}/${asset}/${period}/${assetType}/${tradingPair}/${datasetFilename}`;

      const targetPath = `${pathOutputDirectory}/${tradingPair}/${datasetFilename}`;

      const targetFolder = `${pathOutputDirectory}/${tradingPair}`;

      const datasetInfo: DatasetInfo = { datasetUrl, targetPath, targetFolder, datasetFilename };

      return datasetInfo;
    }),
  );

  return datasetsInfo;
};
