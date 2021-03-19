const mix = require('laravel-mix');
const path = require('path');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .vue()
    .webpackConfig({
        resolve: {
            alias: {
                '@img': path.resolve('public/img')
            }
        },
        module: {
            rules: [
                {
                    test: /(\.(png|jpe?g|gif|webp)$|^((?!font).)*\.svg$)/,
                    loaders: {
                      loader: 'file-loader',
                      options: {
                        name: 'images/[path][name].[ext]',
                        context: 'frontend/src/assets/images'
                      }
                    }
                }
            ]
        }
    })
    .postCss('resources/css/app.css', 'public/css', [
        //
    ])
    .version();
    
   
// Disable build notifications
mix.disableNotifications();
