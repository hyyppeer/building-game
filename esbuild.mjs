import * as esbuild from 'esbuild'

await esbuild.build({
  entryNames: '[dir]/[name]',
  entryPoints: ['src/main.ts'],
  bundle: true,
  outfile: 'dist/main.js',
  platform: 'node',
  external: ['electron'],
})
await esbuild.build({
  entryPoints: ['app/index.html'],
  bundle: true,
  metafile: true,
  outdir: 'dist/app/',
  platform: 'browser',
})
