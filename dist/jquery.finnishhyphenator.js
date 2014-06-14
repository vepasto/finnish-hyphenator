/*!
 * Finnish Hyhpenator
 *
 * Tavuttajan tavoite on helppokäyttöinen ja kevyt selainpuolen
 * tekstien tavutus. Scriptin tarkoitus ei ole olla täydellinen
 * tavuttaja, vaan tavuttaa varmimmat tapaukset. Mielummin
 * tavuttaja jättää tavuttamatta kuin tavuttaa epävarman paikan.
 *
 * 
 * Hyphenation rules:
 *
 * [1] Tavuraja on aina konsonantin ja vokaalin yhdistelmän edellä
 * http://www.kotus.fi/index.phtml?s=4363, Hakupäivä 10.6.2014
 *
 *
 * - Alle kahden merkin tavuja ei tehdä
 *
 * Author: Veikko Karsikko
 */
;(function(window) {

	/**
	 * Constructor
	 */
	function FinnishHyphenator() {
		this.vowels = "aeiouyåäö";
		this.consonants = "bcdfghjklmnpqrstvwxyz";
		this.hyphMark = "\u00AD";
		// construct regExps only once
		this.rule1RegExp = new RegExp("[" + this.consonants + "][" + this.vowels + "]", "gi");
		this.endReg = new RegExp("[" + this.consonants + this.vowels + "]{2}$", "i");
		this.wrapperElement = document.createElement("div");
	}

	/**
	 * Adds hyphen to text if first part matches endReg
	 */
	FinnishHyphenator.prototype.addHyphen = function(text, idx) {
		var firstPart = text.slice(0, idx);
		if (this.endReg.exec(firstPart)) {
			return (text.slice(0, idx) + this.hyphMark + text.slice(idx));
		} else {
			return false;
		}
	};

	/**
	 * Hyphenates JQuery element contents
	 */
	FinnishHyphenator.prototype.hyphenateElement = function(el) {
		for (var i = 0; i < el.childNodes.length; i++) {
			var node = el.childNodes[i];
			if (node.nodeType === 3) {
				// is text element and will be hyphenated
				node.data = this.hyphenateText(node.textContent);
			} else {
				this.hyphenateElement(node);
			}
		}
	};

	FinnishHyphenator.prototype.hyphenateElements = function(els) {
		for (var i = 0; i < els.length; i++) {
			this.hyphenateElement(els[i]);
		}
	};

	/**
	 * Hyphenates text block
	 */
	FinnishHyphenator.prototype.hyphenateText = function(text) {
		var hyphenated = text;
		var hyphPositions = [];

		// rule [1]
		while ((match = this.rule1RegExp.exec(text)) != null) {
			hyphPositions.push(match.index);
		}

		var count = 0;
		for (var i = 0; i < hyphPositions.length; i++) {
			var position = hyphPositions[i] + count * this.hyphMark.length;
			var triedHyphenation = this.addHyphen(hyphenated, position);
			if (triedHyphenation !== false) {
				count++;
				hyphenated = triedHyphenation;
			}
		}
		return hyphenated;
	};

	window.FinnishHyphenator = FinnishHyphenator;

})(window);
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