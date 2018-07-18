export default ({options}) => ({
    plugins: {
      'autoprefixer': options.autoprefixer ? options.autoprefixer : false,
      'cssnano': options.cssnano ? options.cssnano : false,
       'postcss-preset-env': options['postcss-preset-env'] ?  options['postcss-preset-env'] : false
    }
  })