/*!
 * Jquery Plugin for Finnish Hyphenator
 * 
 * Requires finnish hyphenator class
 *
 * Author: Veikko Karsikko
 */
;(function($, window, document, FinnishHyphenator, undefined) {
	var pluginName = "finnishHyphenator";
	var finnishHyphenator = null;

	function Plugin(element) {
		if (!finnishHyphenator) {
			finnishHyphenator = new FinnishHyphenator();
		}
		this.element = element;
		this._name = pluginName;
		this.init();
	}

	$.extend(Plugin.prototype, {
		init: function() {
			finnishHyphenator.hyphenateElement(this.element);
		}
	});

	$.fn[pluginName] = function(options) {
		this.each(function() {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new Plugin(this, options));
			}
		});
		return this;
	};

})(jQuery, window, document, FinnishHyphenator);