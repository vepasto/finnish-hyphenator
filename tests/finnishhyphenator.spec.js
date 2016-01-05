describe("Finnishhyphenator", function (){
  var finnishHyphenator;
  beforeEach(function (){
    finnishHyphenator = new FinnishHyphenator();
  });

  describe('addHyphen()', function (){
    it("should return false if less than 2 characters on left side", function (){
      var text = 'aaa';
      var hyphenated = finnishHyphenator.addHyphen(text, 1);
      expect(hyphenated).toBe(false);
    });

    it("should add hyphen to correct place", function (){
      var text = 'aabb';
      var expectedHyphenated = 'aa' + finnishHyphenator.hyphMark + 'bb';
      var hyphenated = finnishHyphenator.addHyphen(text, 2);
      expect(hyphenated).toBe(expectedHyphenated);
    });
  });

  describe('hyphenateText()', function (){
    it("should hyphenate text", function (){
      var text = 'tavuta tämä';
      var expectedHyphenated = 'ta' + finnishHyphenator.hyphMark + 'vu' + finnishHyphenator.hyphMark + 'ta tä' + finnishHyphenator.hyphMark + 'mä';
      var hyphenated = finnishHyphenator.hyphenateText(text);
      expect(hyphenated).toBe(expectedHyphenated);
    });
  });

  describe('hyphenateElement()', function (){
    it("should hyphenate element with one text node", function (){
      var text = 'tavuta tämä';
      var expectedHyphenated = 'ta' + finnishHyphenator.hyphMark + 'vu' + finnishHyphenator.hyphMark + 'ta tä' + finnishHyphenator.hyphMark + 'mä';

      var element = document.createElement("div");
      var t = document.createTextNode(text);
      element.appendChild(t);

      finnishHyphenator.hyphenateElement(element);

      expect(element.textContent).toBe(expectedHyphenated);
    });

    it("should hyphenate element with two text nodes", function (){
      var text = 'tavuta tämä';
      var text2 = ' ja tämä';
      var expectedHyphenated = 'ta' + finnishHyphenator.hyphMark + 'vu' + finnishHyphenator.hyphMark + 'ta tä' + finnishHyphenator.hyphMark + 'mä ja tä' + finnishHyphenator.hyphMark + 'mä';

      var element = document.createElement("div");
      var t = document.createTextNode(text);
      var t2 = document.createTextNode(text2);
      element.appendChild(t);
      element.appendChild(t2);

      finnishHyphenator.hyphenateElement(element);

      expect(element.textContent).toBe(expectedHyphenated);
    });

    it("should hyphenate element with child elements", function (){
      var text = 'tavuta tämä';
      var text2 = ' ja tämä';
      var expectedHyphenated = 'ta' + finnishHyphenator.hyphMark + 'vu' + finnishHyphenator.hyphMark + 'ta tä' + finnishHyphenator.hyphMark + 'mä ja tä' + finnishHyphenator.hyphMark + 'mä';

      var element = document.createElement("div");
      var childElement = document.createElement("h1");
      var t = document.createTextNode(text);
      var t2 = document.createTextNode(text2);
      element.appendChild(t);
      element.appendChild(childElement);
      childElement.appendChild(t2);

      finnishHyphenator.hyphenateElement(element);

      expect(element.textContent).toBe(expectedHyphenated);
    });


    describe('hyphenateElements()', function (){

      beforeEach(function (){
        spyOn(finnishHyphenator, 'hyphenateElement').and.returnValue(true);
      });
      afterEach(function (){
        finnishHyphenator.hyphenateElement.calls.reset();
      });

      it('should call hyphenateElement() twice with correct parameters', function (){
        var elements = [document.createElement("div"), document.createElement("h1")];
        finnishHyphenator.hyphenateElements(elements);
        expect(finnishHyphenator.hyphenateElement.calls.count()).toEqual(2);
        expect(finnishHyphenator.hyphenateElement).toHaveBeenCalledWith(elements[0]);
        expect(finnishHyphenator.hyphenateElement).toHaveBeenCalledWith(elements[1]);
      });

      it('should call hyphenateElement() one with correct parameters', function (){
        var elements = [document.createElement("div")];
        finnishHyphenator.hyphenateElements(elements);
        expect(finnishHyphenator.hyphenateElement.calls.count()).toEqual(1);
        expect(finnishHyphenator.hyphenateElement).toHaveBeenCalledWith(elements[0]);
      });
    });
  });
});
