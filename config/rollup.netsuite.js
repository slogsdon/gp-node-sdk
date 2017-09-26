import path from 'path';
import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import alias from 'rollup-plugin-alias';
import replace from 'rollup-plugin-replace';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

export default {
  input: './src/index.ts',
  output: {
    file: './lib/netsuite/globalpayments.api.js',
    format: 'amd',
  },
  sourcemap: false,
  name: 'GlobalPayments.Api',

  banner: `/**
 * GlobalPayments.Api
 *
 * @NApiVersion 2.x
 * @NModuleScope public
 */`,

  plugins: [
    replace({
      'process.env.ENVIRONMENT': JSON.stringify('netsuite'),
    }),
    alias({
      resolve: ['.js', '.ts'],
      https: path.resolve(__dirname, '../src/netsuite/https'),
    }),
    globals(),
    builtins(),
    resolve({
      preferBuiltins: false,
    }),
    commonjs(),
    typescript({
      allowSyntheticDefaultImports: true,
      module: 'es2015',
      typescript: require('typescript'),
    }),
  ],
}
