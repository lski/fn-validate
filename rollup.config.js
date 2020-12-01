/* eslint-env node */
import pkg from './package.json';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';

const env = process.env.NODE_ENV;
const banner = `// ${pkg.name} ${pkg.version}`;

let output;

if (env === 'legacy') {
	output = {
		input: 'src/index.js',
		plugins: [babel({ babelHelpers: 'bundled' })],
		output: [
			{
				file: pkg.browser,
				format: 'iife',
				name: 'fnValidate',
				plugins: [terser()],
				sourcemap: true,
				banner,
			},
			{
				file: pkg.main,
				format: 'cjs',
				exports: 'named',
				plugins: [terser()],
				sourcemap: true,
				banner,
			},
		],
	};
} else {
	const terserOptions = {
		ecma: 2017,
		safari10: true,
	};

	output = {
		input: 'src/index.js',
		plugins: [babel({ babelHelpers: 'bundled' })],
		output: [
			{
				banner,
				dir: 'dist/es',
				format: 'es',
				exports: 'named',
				preserveModules: true,
				preserveModulesRoot: 'src',
				plugins: [terser(terserOptions)],
				sourcemap: true,
			},
			{
				banner,
				file: 'dist/fn-validate.es.js',
				format: 'es',
				exports: 'named',
				plugins: [terser(terserOptions)],
				sourcemap: true,
			},
		],
	};
}

export default output;
