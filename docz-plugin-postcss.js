import { css } from 'docz-plugin-css';

const defaultOpts = {
  stage: 0,
  browsers: 'last 2 versions',
  features: {
    'nesting-rules': true,
  },
};

export const postCSSPlugin = (opts = defaultOpts) =>
  css({
    preprocessor: 'postcss',
    loaderOpts: {
      plugins: [require(`postcss-preset-env`)(opts)],
    },
  });
