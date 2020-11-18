export function isFunction(func) {
	if (typeof func === 'function' && func.call) {
		return true;
	}

	return false;
}
