const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "production", // или 'development' в зависимости от ваших нужд
  entry: "./src/index.js", // точка входа вашей библиотеки
  output: {
    filename: "index.js", // имя выходного файла
    path: path.resolve(__dirname, "dist"), // папка для выходных файлов
    library: "cli", // имя вашей библиотеки
    libraryTarget: "commonjs2", // формат библиотеки для Node.js
  },
  target: "node", // указываем, что это библиотека для Node.js
  resolve: {
    extensions: [".ts", ".js"], // расширения файлов, которые Webpack будет обрабатывать
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // обрабатываем файлы с расширением .ts
        use: "ts-loader", // используем ts-loader для компиляции TypeScript
        exclude: /node_modules/, // исключаем папку node_modules
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({ banner: "#!/usr/bin/env node", raw: true }),
  ],
  externals: {
    // Указываем, что эти модули не нужно бандлить
    fs: "commonjs fs",
    path: "commonjs path",
    // Добавьте другие модули, которые не нужно бандлить
  },
  devtool: "source-map", // для генерации sourcemaps
};
