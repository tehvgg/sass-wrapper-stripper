/**
 * author / Patrick McGuckin
 * twitter / @pmcgooks
 * github / tehvgg
 * jsfiddle / tehvgg
 */

(function () {

	/**
	 * Remove the remaining closer brace left over by tokenize()'s data attribute removal.
	 *
	 * @method removeCloser
	 * @param str {string} The text to parse.
	 * @returns {string} The parsed text.
	 */
	function removeCloser (str) {
		var closer = /}/g,
			opener = /{/g,
			closerMatch,
			openerMatch;
		// loop through each closer
		while ((closerMatch = closer.exec(str)) !== null) {
			openerMatch = opener.exec(str);
			// if an opener is not found or it comes after the matched closer, remove the matched closer and return.
			if (openerMatch === null || openerMatch.index > closerMatch.index) {
				return str.slice(0, closerMatch.index) + str.slice(closer.lastIndex);
			}
		}
	}

	/**
	 * Remove each data-attr attribute from the stylesheet.
	 *
	 * @method tokenize
	 * @param str {string} The text to parse.
	 * @returns {string} The parsed text.
	 */
	function tokenize (str) {
		// Feel free to make this regex as targetted or loose as you want.
		var re = /\[data-attr="#\{\$id}"]\s?\{/g,
			match;
		while ((match = re.exec(str)) !== null) {
			str = str.slice(0, match.index) + removeCloser(str.slice(re.lastIndex));
		}
		return str;
	}

	/**
	 * Remove 2 spaces from the beginning of each line.
	 *
	 * @method beautify
	 * @param str {string} The string to beautify.
	 * @returns {string} The beautified string.
	 */
	function beautify (str) {
		// adjust the space/tab count depending on your project settings.
		return str.trim().replace(/^\s{2}/mg, '');
	}

})();