import { TimeSpanDaily, TimeSpanMonthly, TradingPair } from './common';

/**
 * Spot trades.
 */
export type DatasetBinanceSpot = DatasetBinanceSpotDaily | DatasetBinanceSpotMonthly;

type DatasetBinanceSpotBase = {
  asset: 'spot';
  assetType: 'aggTrades' | 'klines' | 'trades';
  tradingPair: TradingPair;
};

type DatasetBinanceSpotDaily = DatasetBinanceSpotBase & {
  period: 'daily';
  timeSpans: ReadonlyArray<TimeSpanDaily>;
};

type DatasetBinanceSpotMonthly = DatasetBinanceSpotBase & {
  period: 'monthly';
  timeSpans: ReadonlyArray<TimeSpanMonthly>;
};
