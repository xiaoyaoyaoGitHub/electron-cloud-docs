module.exports = {
    webpack: {
        resolve: {
            extensitions: ['.js', '.jsx']
        }
    },
    style: {
        sass: {
            loaderOptions: { /* ... */ },
            loaderOptions: (sassLoaderOptions, { env, paths }) => {
                /* ... */
                return sassLoaderOptions;
            },
        },
    }
}