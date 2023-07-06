import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'
import json from '@rollup/plugin-json'

const bundle = (config) => ({
  ...config,
  input: 'src/index.ts',
})

export default [
  bundle({
    plugins: [
      esbuild({
        target: 'esnext',
        optimizeDeps: {
          include: ['@paraswap/sdk'],
        },
        minify: true,
      }),
      json(),
    ],
    output: [
      {
        file: `dist/spritz-sdk.js`,
        format: 'cjs',
      },
      {
        file: `dist/spritz-sdk.mjs`,
        format: 'es',
      },
    ],
    external: ['@uniswap/sdk-core', '@uniswap/smart-order-router', 'ethers', 'axios'],
  }),
  bundle({
    plugins: [dts()],
    output: {
      file: `dist/spritz-sdk.d.ts`,
      format: 'es',
    },
  }),
]
