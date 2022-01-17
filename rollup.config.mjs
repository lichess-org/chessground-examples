import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/main.ts',
  output: [
    {
      file: 'dist/chessground-examples.js',
      format: 'iife',
      name: 'ChessgroundExamples',
    },
    // {
    //   file: 'dist/chessground-examples.min.js',
    //   format: 'iife',
    //   name: 'ChessgroundExamples',
    // },
  ],
  plugins: [resolve(), typescript(), commonjs()],
};
