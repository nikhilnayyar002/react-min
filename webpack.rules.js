// For this to work: "rules" must be an array/object of objects containing "use". "use" is an array/object of objects
exports.use_options_rule = {
  module: {
    rules: {
      test: "match",
      use: {
        loader: "match",
        options: "replace",
      },
    },
  },
};
exports.use_rule = {
  module: {
    rules: {
      test: "match",
      use: "prepend",
    },
  },
};
