import { DAYS, MONTHS, TimeSpan, YEARS } from 'core/binance/types/common';
import { DatasetBinanceSpot } from 'core/binance/types/spot';

import { createDatasetFilename } from './createDatasetFilename';

type CreateDatasetFilenamesParams = {
  timeSpan: TimeSpan;
  tradingPairFormatted: string;
  assetType: DatasetBinanceSpot['assetType'];
};

export const createDatasetFilenames = ({
  timeSpan,
  tradingPairFormatted,
  assetType,
}: CreateDatasetFilenamesParams): ReadonlyArray<string> => {
  const { period } = timeSpan;

  const isAllYearsAvailable = timeSpan.years.length === 0;
  const years = isAllYearsAvailable ? YEARS : timeSpan.years;

  const datasetFilenames = years.flatMap((year) => {
    const isAllMonthsInYear = timeSpan.months.length === 0;
    const months = isAllMonthsInYear ? MONTHS : timeSpan.months;

    const datasetFilenamesMonths = months.flatMap((month) => {
      if (period === 'monthly') {
        const datasetFilenamesFromMonth = createDatasetFilename({
          tradingPairFormatted,
          assetType,
          period,
          year,
          month,
        });

        return datasetFilenamesFromMonth;
      }

      const isAllDaysInMonth = timeSpan.days.length === 0;
      const days = isAllDaysInMonth ? DAYS : timeSpan.days;

      const datasetFilenamesFromDays = days.map((day) => {
        const datasetFilenamesFromDay = createDatasetFilename({
          tradingPairFormatted,
          assetType,
          period,
          year,
          month,
          day,
        });

        return datasetFilenamesFromDay;
      });
      return datasetFilenamesFromDays;
    });

    return datasetFilenamesMonths;
  });

  return datasetFilenames;
};
