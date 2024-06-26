import copyPlugin from '@sprout2000/esbuild-copy-plugin'
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
  entryPoints: ['app/script.ts'],
  bundle: true,
  outdir: 'dist/app/',
  platform: 'browser',
  plugins: [
    copyPlugin.copyPlugin({
      src: 'app/',
      dest: 'dist/app/',
    }),
  ],
})
