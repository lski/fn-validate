/* eslint-env node */
module.exports = (api) => {
	// If we are in jest then simply run it against node
	const targets = api.env('test') ? { node: 'current' } : '> 0.25%, not dead';

	return {
		presets: [
			[
				'@babel/preset-env',
				{
					targets,
				},
			],
		],
	};
};
