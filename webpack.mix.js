let mix = require('laravel-mix')

mix.js('src/index.js', 'dist/js')
   .js('test/app.js', 'test/compiled.js')	