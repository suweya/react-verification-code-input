import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';
import svgr from '@svgr/rollup';
import react from 'react';
import reactDom from 'react-dom';
import ts from 'rollup-plugin-typescript2';

import pkg from './package.json';

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    external(),
    postcss({
      modules: true
    }),
    url(),
    svgr(),
    ts({ useTsconfigDeclarationDir: true }),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers']
    }),
    resolve(),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        react: Object.keys(react),
        'react-dom': Object.keys(reactDom)
      }
    })
  ]
};
