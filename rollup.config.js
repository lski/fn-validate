import pkg from './package.json';
import { terser } from 'rollup-plugin-terser';
import del from 'rollup-plugin-delete';

const banner = `// fn-validate ${pkg.version}`;

export default {
	input: 'src/index.js',
	plugins: [del({ targets: 'dist/*' })],
	output: [
		{
			file: pkg.module,
			format: 'es',
			exports: 'named',
			sourcemap: true,
			banner,
		},
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

// umd and es, maybe a dev build?
