import { TradezapConfig } from 'common/types';

const TRADEZAP_CONFIG: TradezapConfig = [
  {
    provider: 'binance',
    settings: {
      outputDirectory: 'example/binance/dataset',
      shouldUnzipDatasets: true,
    },
    datasets: [
      // Get daily spot trades for AVAX-BUSD trading pair:
      {
        asset: 'spot',
        assetType: 'trades',
        tradingPair: 'AVAX-BUSD',
        period: 'daily',
        timeSpans: [
          // - 1st, 2nd and 3td of April and May 2023
          {
            years: [2023],
            months: [4, 5],
            days: [1, 2, 3],
          },
          // - October and November of 2022
          // {
          //   year: [2022],
          //   months: [10, 11],
          //  days: [],
          // },
          // - Every 1st of the month in 2021
          // {
          //   years: [2021],
          //   months: [],
          //   days: [1],
          // },
        ],
      },
      // Get daily spot trades for ETH-BUSD trading pair on 1st of January 2021, 2022 and 2023
      // {
      //   tradingPair: 'ETH-BUSD',
      //   timeSpans: [
      //     {
      //       year: [2021, 2022, 2023],
      //       months: [1],
      //       days: [1],
      //     },
      //   ],
      // },
    ],
  },
];

export default TRADEZAP_CONFIG;
