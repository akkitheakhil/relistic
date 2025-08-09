module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            // ...any other plugins here
            'react-native-worklets/plugin', // 👈 must be last
        ],
    };
};