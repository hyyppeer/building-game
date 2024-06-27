import copyPlugin from '@sprout2000/esbuild-copy-plugin'
import vuePlugin from 'esbuild-plugin-vue-next'
import * as esbuild from 'esbuild'

await esbuild.build({
  entryNames: '[dir]/[name]',
  entryPoints: ['desktop/main.ts', 'desktop/preload.ts'],
  bundle: true,
  outdir: 'dist/desktop/',
  platform: 'node',
  external: ['electron'],
  minify: true,
  sourcemap: true,
})

await esbuild.build({
  entryNames: '[dir]/[name]',
  entryPoints: ['web/server.ts'],
  bundle: true,
  outfile: 'dist/webserver.js',
  platform: 'node',
  minify: true,
  sourcemap: true,
})

await esbuild.build({
  entryPoints: ['core/game.ts', 'core/index.ts'],
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
