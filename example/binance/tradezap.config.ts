import { ProviderBinance } from 'core/binance/types';

const PROVIDER_BINANCE: ProviderBinance = {
  settings: {
    shouldUnzipDatasets: true,
  },
  datasets: [
    {
      asset: 'spot',
      assetType: 'trades',
      // tradingPair: 'BTC-BUSD',
      tradingPair: 'AVAX-BUSD',
      period: 'daily',
      timeSpans: [
        {
          years: [2023],
          months: [1, 2],
          days: [4, 5, 6],
        },
        // {
        //   year: [2022],
        //   months: [10, 11, 12],
        //  days: [],
        // },
        // {
        //   years: [2021],
        //   months: [],
        //   days: [1, 2, 3],
        // },
      ],
    },
    // {
    //   tradingPair: 'ETH-BUSD',
    //   timeSpans: [
    //     {
    //       year: [2023],
    //       months: [4, 11],
    //     },
    //   ],
    // },
  ],
};

export default PROVIDER_BINANCE;
