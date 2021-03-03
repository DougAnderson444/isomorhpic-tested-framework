// esbuild src/index.js --bundle --minify --sourcemap --target=chrome58,firefox57,safari11,edge16 --outfile=bundle.js
// doesnt work because rollup doesn't resolve to the browser field of panva/jose
require('esbuild').build({
  entryPoints: ['src/index.js'],
  bundle: true,
  minify: true,
  sourcemap: true,
  platform: 'browser',
  target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
  outfile: 'dist/bundle.js'
}).catch(() => process.exit(1))
