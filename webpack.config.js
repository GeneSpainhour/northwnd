var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader')
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path')
var process = require('process')

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    var ret = path.join.apply(path, [__dirname].concat(args));
    log("root( " + args + " ) => " + ret);
    return ret;
}

function log(msg) {
    process.stderr.write(msg + "\n")
}

log("tsconfig.root: " + root("") + "\n\n\n")

module.exports = {
    context: root("./src"),
    devtool: "inline-source-map",

    entry: './main.ts',
    output: {
        path: root("./dist"),
        pathinfo: true,
        filename: 'app.bundle.js',
        sourceMapFilename: 'app.bundle.js.map',
        // publicPath : "http://localhost:4000"
    },
    module: {
        rules: [{
                test: /\.component.ts$/
                    //loader: 'awesome-typescript-loader?useTranspileMode=true!angular2-template-loader' 
                    //'keepUrl=true&debug=true&raw=true'
                    ,
                use: [{
                    loader: 'awesome-typescript-loader',
                    options: {
                        useTranspileMode: true
                            // , debug:false
                    }
                }, {
                    loader: 'angular2-template-loader'
                        //, options: {
                        //   keepUrl: true
                        //   , debug: true
                        //   , raw : true
                        // }
                }]
            },

            {
                test: /\.ts$/,
                exclude: /\.component.ts$/,
                use: {
                    loader: 'awesome-typescript-loader',
                    options: {
                        useTranspileMode: true
                            //  , debug:true
                    }
                }
            },

            { test: /\.html$/, use: 'raw-loader' },
            { test: /\.css$/, use: ['css-to-string-loader', 'css-loader'] },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[hash].[ext]'
                    }
                }]
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "source-map-loader"
            }
        ]
    },
    resolve: {
        modules: [
            root("./src"),
            "node_modules"
        ],
        extensions: ['.ts', '.js', '.html', '.css']
    },

    devServer: {
        historyApiFallback: true,
        quiet: false,
        stats: 'normal', // none (or false), errors-only, minimal, normal (or true) and verbose
        // watchOptions: { aggregateTimeout: 300, poll: 1000 },
        watchOptions: {
            poll: 1000,
            ignored: /node_modules/
        }

    },
    node: {
        global: true,
        console: true,
        Buffer: true,
        __dirname: true,
        __filename: true


    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new webpack.DefinePlugin({
            app: {
                environment: JSON.stringify(process.env.APP_ENVIRONMENT || 'development')
            }
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                context: root("./src")
            }
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                debug: true
            }
        }),

        new CopyWebpackPlugin([
            { from: "assets", to: "assets" }
        ]),
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            ///angular\\core\\(esm\\src|src)\\linker/,
            ///angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            /angular(\\|\/)core(\\|\/)@angular/,

            root('./src') // location of your src
        ),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new CheckerPlugin(),
        new TsConfigPathsPlugin()
    ]

};


log("  context: " + module.exports.context)
log("  output.path: " + module.exports.output.path)
log("  resolve.modules.root: " + module.exports.resolve.modules[0])