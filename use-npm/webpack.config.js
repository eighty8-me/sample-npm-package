const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin'); // HTMLファイル生成プラグイン
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // CSSファイル生成プラグイン

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    // contentBase: path.resolve(__dirname, 'dist'),
    contentBase: './dist',
    watchContentBase: true,
    open: true,
    port: 4000,
  },
  // ソースマップの書き出し
  devtool: 'source-map',
  // モジュールの管理
  module: {
    rules: [
      //===========================================
      // babel-loader の設定
      //===========================================
      // {
      //   // 拡張子が js だったら
      //   test: /\.js$/,
      //   use: [
      //     {
      //       loader: 'babel-loader',
      //       options: {
      //         // プリセットを指定することで ES2019 を ES5 に変換する
      //         presets: [
      //           '@babel/preset-env'
      //         ]
      //       }
      //     }
      //   ],
      //   exclude: /node_modules/,
      // },
      //===========================================
      // ts-loader の設定
      //===========================================
      {
        // 拡張子が ts だったら
        test: /\.ts$/,
        use: [
          { loader: "ts-loader" }
        ],
      },
      //===========================================
      // css-loader, sass-loader の設定
      //===========================================
      {
        // 拡張子が sass, scss, css のいずれかだったら
        test: /\.(sa|sc|c)ss$/,
        use:
          [
            {
              // CSSファイルを書き出すオプションを有効にする
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                // オプションで CSS 内の url() メソッドの取り込みを禁止する
                url: false,
                // 0 => no loaders (default);
                // 1 => postcss-loader;
                // 2 => postcss-loader, sass-loader
                importLoaders: 2,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  // CSS の minify や重複整理を行う（optimizationを上書きするのであれば必要なし）
                  // require('cssnano')({
                  //   preset: 'default',
                  // }),
                  // Autoprefixerを有効化
                  // ベンダープレフィックスを自動付与する
                  require('autoprefixer')({
                    grid: true
                  })
                ]
              }
            },
            {
              loader: 'sass-loader',
            },
          ],
      },
    ]
  },
  // import 文で .ts/.js ファイルを解決する
  resolve: {
    extensions: ['.ts', '.js'],
  },
  // プラグインの管理
  plugins: [
    // mini-css-extract-plugin の設定
    new MiniCssExtractPlugin({
      filename: 'style2.css'
    }),
    // サイトトップ
    // new HtmlWebpackPlugin({
    //   title: 'Teck Offer Designs',
    //   // HTMLのアウトプット先とファイル名指定
    //   filename: './index.html',
    //   // テンプレート
    //   template: './src/html/index.html'
    // }),
  ]
}
