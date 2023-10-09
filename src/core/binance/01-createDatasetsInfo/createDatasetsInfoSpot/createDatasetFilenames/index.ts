import { DAYS, TimeSpan } from 'core/binance/types/common';
import { SpotAssetType } from 'core/binance/types/spot';

import { createDatasetFilename } from './createDatasetFilename';

type CreateDatasetFilenamesParams = {
  timeSpan: TimeSpan;
  tradingPair: string;
  assetType: SpotAssetType;
};

export const createDatasetFilenames = ({
  timeSpan,
  tradingPair,
  assetType,
}: CreateDatasetFilenamesParams): ReadonlyArray<string> => {
  const { period } = timeSpan;

  const datasetFilenames = timeSpan.years.flatMap((year) =>
    timeSpan.months.flatMap((month) => {
      if (period === 'monthly') {
        const datasetFilenamesFromMonth = createDatasetFilename({ tradingPair, assetType, period, year, month });

        return datasetFilenamesFromMonth;
      }

      const isAllDaysInMonth = timeSpan.days.length === 0;
      const days = isAllDaysInMonth ? DAYS : timeSpan.days;

      const datasetFilenamesFromDays = days.map((day) => {
        const datasetFilenamesFromDay = createDatasetFilename({
          tradingPair,
          assetType,
          period,
          year,
          month,
          day,
        });

        return datasetFilenamesFromDay;
      });
      return datasetFilenamesFromDays;
    }),
  );

  return datasetFilenames;
};
