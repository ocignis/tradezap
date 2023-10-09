import { TimeSpanDaily, TimeSpanMonthly, TradingPair } from './common';

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

/**
 * Spot trades.
 * @link https://data.binance.vision/?prefix=data/spot/
 */
export type DatasetBinanceSpot = DatasetBinanceSpotDaily | DatasetBinanceSpotMonthly;
