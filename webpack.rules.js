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
}
exports.use_rule = {
    module: {
        rules: {
            test: "match",
            use: "prepend"
        },
    },
}