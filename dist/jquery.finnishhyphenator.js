/**
 * Tavuttajan tavoite on helppokäyttöinen ja kevyt selainpuolen
 * tekstien tavutus. Scriptin tarkoitus ei ole olla täydellinen
 * tavuttaja, vaan tavuttaa varmimmat tapaukset. Mielummin
 * tavuttaja jättää tavuttamatta kuin tavuttaa epävarman paikan.
 *
 * Säännöt joita noudatetaan:
 *
 * [1] Tavuraja on aina konsonantin ja vokaalin yhdistelmän edellä
 * http://www.kotus.fi/index.phtml?s=4363, Hakupäivä 10.6.2014
 *
 * Author: Veikko Karsikko
 */

;(function($, window, document, undefined) {
	var vowels = "aeiouyåäö";
	var consonants = "bcdfghjklmnpqrstvwxyz";
	var hyphMark = "&shy;"; 
	// construct regExps only once
	var rule1RegExp = new RegExp("[" + consonants + "][" + vowels + "]", "gi");
	var endReg = new RegExp("[" + consonants + vowels + "]{2}$", "i");

	var pluginName = "finnishHyphenator";

	var addHyphen = function(text, idx) {
		var firstPart = text.slice(0, idx);
		if (endReg.exec(firstPart)) {
			return (text.slice(0, idx) + hyphMark + text.slice(idx));
		} else {
			return false;
		}
	};

	var $wrapperElement = $("<div></div>");
	var hyphenateElement = function($el) {
		$el.contents().each(function() {
			var $node = $(this);
			if (this.nodeType === 3) {
				// is text element and will be hyphenated
				var hyphenated = hyphenateText(this.textContent);
				$wrapperElement.html(hyphenated);
				$node.before($wrapperElement.html());
				$node.remove();
			} else {
				hyphenateElement($node);
			}
		});
	};

	var hyphenateText = function(text) {
		var hyphenated = text;
		var hyphPositions = [];

		// rule [1]
		while ((match = rule1RegExp.exec(text)) != null) {
			hyphPositions.push(match.index);
		}

		var count = 0;
		for (var i = 0; i < hyphPositions.length; i++) {
			var position = hyphPositions[i] + count * hyphMark.length;
			var triedHyphenation = addHyphen(hyphenated, position);
			if (triedHyphenation !== false) {
				count++;
				hyphenated = triedHyphenation;
			}
		}
		return hyphenated;
	};

	function Plugin(element) {
		this.element = element;
		this._name = pluginName;
		this.init();
	}

	$.extend(Plugin.prototype, {
		init: function() {
			hyphenateElement($(this.element));
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

})(jQuery, window, document);