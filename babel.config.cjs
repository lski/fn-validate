/* eslint-env node */
module.exports = (api) => {
	const env = api.env();

    // 'test' requires a node environment ('test' is set by jest automatically)
    // 'legacy' older environments that dont support esmodules
    // 'modern' (default) is for environments that support esmodules
	const targets = env === 'test' ? { node: 'current' } : env === 'legacy' ? '>0.25%, not dead' : { esmodules: true };

	console.log('Babel environment: ', env, ' targets: ', targets);

	return {
		presets: [
			[
				'@babel/preset-env',
				{
					bugfixes: true,
					modules: false,
					targets,
				},
			],
		],
	};
};
