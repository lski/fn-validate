export const replaceValues = (text, replacements) => {
	var output = text;

	for (let prop in replacements) {
		output = output.replace('{' + prop + '}', replacements[prop]);
	}

	return output;
};
