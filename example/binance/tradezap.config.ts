import { ProviderBinance } from 'core/binance/types';

const PROVIDER_BINANCE: ProviderBinance = {
  settings: {
    shouldUnzipDatasets: true,
  },
  datasets: [
    {
      tradingPair: 'BTC-BUSD',
      timeSpans: [
        {
          year: [2023],
          months: [5, 6],
        },
        // {
        //   year: [2022],
        //   months: [10, 11, 12],
        // },
        {
          year: [2021],
          months: [],
        },
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
