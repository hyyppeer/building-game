import copyPlugin from '@sprout2000/esbuild-copy-plugin'
import vuePlugin from 'esbuild-plugin-vue-next'
import * as esbuild from 'esbuild'

await esbuild.build({
  entryNames: '[dir]/[name]',
  entryPoints: ['src/main.ts'],
  bundle: true,
  outfile: 'dist/main.js',
  platform: 'node',
  external: ['electron'],
  minify: true,
  sourcemap: true,
})

await esbuild.build({
  entryPoints: ['core/script.ts'],
  sourcemap: true,
  bundle: true,
  outdir: 'dist/core/',
  platform: 'browser',
  plugins: [
    copyPlugin.copyPlugin({
      src: 'core/',
      dest: 'dist/core/',
    }),
    vuePlugin(),
  ],
  minify: true,
})
