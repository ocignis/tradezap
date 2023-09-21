import dts from 'bun-plugin-dts';

await Bun.build({
  entrypoints: ['./src/core/binance/index.ts', './src/core/binance/types.ts'],
  outdir: './dist',
  target: 'bun',
  format: 'esm',
  splitting: false,
  sourcemap: 'none',
  external: [],
  // minify: true, When targeting 'bun', identifiers will be minified by default.
  minify: false,
  plugins: [dts()],
});
