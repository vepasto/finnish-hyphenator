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
		this.consonants = "bcdfghjklmnpqrstvwxz";
		this.hyphMark = "\u00AD";
		this.hyphenRegexp=new RegExp("([" + this.consonants + this.vowels +"]{2})(?=[" + this.consonants + "][" + this.vowels + "])","ig");
	}

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
		return text.replace(this.hyphenRegexp,"$1"+this.hyphMark);
	};

	window.FinnishHyphenator = FinnishHyphenator;

})(window);
