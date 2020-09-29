const less = require('@yinxulai/rollup-plugin-less')

module.exports = {
  extends: '@snowpack/app-scripts-react',
  installOptions: {
    rollup: {
      plugins: [
        less({
          lessOptions: {
            javascriptEnabled: true,
          },
        }),
      ],
    },
  },
  devOptions: {
    port: 3000,
    open: 'none',
    bundle: false,
  },
}
