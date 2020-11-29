/* eslint-env node */
module.exports = (api) => {
	const env = api.env();

	// test requires a node enviroment
	// legacy (basically nomodules browsers) anything not dead
	// The default is for environments that support esmodules (modernish)
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
