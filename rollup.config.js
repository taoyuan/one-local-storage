const cleaner = require('rollup-plugin-cleaner');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('rollup-plugin-typescript2');

const packageJson = require('./package.json');

module.exports = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      cleaner({
        targets: ['./lib'],
      }),
      peerDepsExternal(),
      // resolve(),
      commonjs(),

      typescript({
        tsconfigOverride: {
          exclude: ['cli/**/*', '**/*.stories.tsx', '**/*.test.tsx'],
        },
      }),
    ],
  },
];
