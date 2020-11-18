export const regexEscape = (value) => {
	return value.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
};
