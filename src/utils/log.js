/* global console */
export const log = (console && console.log && console.log.bind(console)) || (() => null);
