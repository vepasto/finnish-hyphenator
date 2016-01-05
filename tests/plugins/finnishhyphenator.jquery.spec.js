describe("Finnishhyphenator Jquery Plugin", function (){
  var finnishHyphenator = new FinnishHyphenator();

  it('jquery plugin should exist', function (){
    expect($.fn.finnishHyphenator).toBeDefined();
  });

  describe('hyphenate elements', function (){
    it("should hyphenate element with one text node", function (){
      var text = 'tavuta tämä';
      var expectedHyphenated = 'ta' + finnishHyphenator.hyphMark + 'vu' + finnishHyphenator.hyphMark + 'ta tä' + finnishHyphenator.hyphMark + 'mä';

      var element = document.createElement("div");
      element.setAttribute("id", "test-element");
      var t = document.createTextNode(text);
      element.appendChild(t);

      $(element).finnishHyphenator();
      expect(element.textContent).toBe(expectedHyphenated);
    });
  });
});
