await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  target: 'bun',
  format: 'esm',
  splitting: false,
  sourcemap: 'none',
  external: [],
  // minify: true, When targeting 'bun', identifiers will be minified by default.
});
