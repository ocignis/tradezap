import { TimeSpans, TradingPair } from './common';

export type DatasetBinanceSpotAggTrades = {
  asset: 'spot';
  assetType: 'aggTrades';
  tradingPair: TradingPair;
  timeSpans: TimeSpans;
};

export type DatasetBinanceSpotKlines = {
  asset: 'spot';
  assetType: 'klines';
  interval: '1s' | '1m' | '3m' | '5m' | '15m' | '30m' | '1h' | '2h' | '4h' | '6h' | '8h' | '12h' | '1d';
  tradingPair: TradingPair;
  timeSpans: TimeSpans;
};

export type DatasetBinanceSpotTrades = {
  asset: 'spot';
  assetType: 'trades';
  tradingPair: TradingPair;
  timeSpans: TimeSpans;
};

/**
 * Spot trades.
 * @link https://data.binance.vision/?prefix=data/spot/
 */
export type DatasetBinanceSpot = DatasetBinanceSpotAggTrades | DatasetBinanceSpotKlines | DatasetBinanceSpotTrades;
