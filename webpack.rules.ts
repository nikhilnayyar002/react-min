// For this to work: "rules" must be an array/object of objects containing "use". "use" is an array/object of objects
import { mergeWithRules } from 'webpack-merge';

export const mergeLoaderOptionRule: Parameters<typeof mergeWithRules>[0] = {
  module: {
    rules: {
      test: 'match',
      use: {
        loader: 'match',
        options: 'merge',
      },
    },
  },
};

export const prependLoaderRule: Parameters<typeof mergeWithRules>[0] = {
  module: {
    rules: {
      test: 'match',
      use: 'prepend',
    },
  },
};
