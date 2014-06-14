/**
 * Tavuttajan tavoite on helppokäyttöinen ja kevyt selainpuolen
 * tekstien tavutus. Scriptin tarkoitus ei ole olla täydellinen
 * tavuttaja, vaan tavuttaa varmimmat tapaukset. Mielummin
 * tavuttaja jättää tavuttamatta kuin tavuttaa epävarman paikan.
 *
 * Hyphenation rules:
 *
 * [1] Tavuraja on aina konsonantin ja vokaalin yhdistelmän edellä
 * http://www.kotus.fi/index.phtml?s=4363, Hakupäivä 10.6.2014
 *
 * Author: Veikko Karsikko
 */

;(function($, window, document, undefined) {
	var pluginName = "finnishHyphenator";
	var finnishHyphenator = null;

	function FinnishHyphenator(){
		this.vowels = "aeiouyåäö";
		this.consonants = "bcdfghjklmnpqrstvwxyz";
		this.hyphMark = "&shy;"; 
		// construct regExps only once
		this.rule1RegExp = new RegExp("[" + consonants + "][" + vowels + "]", "gi");
		this.endReg = new RegExp("[" + consonants + vowels + "]{2}$", "i");
		this.$wrapperElement = $("<div></div>");

	}
	FinnishHyphenator.prototype.addHyphen = function(text, idx) {
		var firstPart = text.slice(0, idx);
		if (this.endReg.exec(firstPart)) {
			return (text.slice(0, idx) + this.hyphMark + text.slice(idx));
		} else {
			return false;
		}
	}
	FinnishHyphenator.prototype.hyphenateElement = function($el) {
		var classScope = this;
		$el.contents().each(function() {
			var $node = $(this);
			if (this.nodeType === 3) {
				// is text element and will be hyphenated
				var hyphenated = classScope.hyphenateText(this.textContent);
				$wrapperElement.html(hyphenated);
				$node.before($wrapperElement.html());
				$node.remove();
			} else {
				classScope.hyphenateElement($node);
			}
		});
	}

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

	function Plugin(element) {
		if(!finnishHyphenator){
			finnishHyphenator = new FinnishHyphenator();
		}
		this.element = element;
		this._name = pluginName;
		this.init();
	}

	$.extend(Plugin.prototype, {
		init: function() {
			finnishHyphenator.hyphenateElement($(this.element));
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