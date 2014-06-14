# Finnish Hyphenator

*An ultra-light Finnish text hyphenator.*

The Finnish Hyphenator jQuery Plugin provides drop-in improvements for your visual structure, while making simple customizations to fit your application more easily.



## Getting Started

### Downloading the prebuilt files

Prebuilt files can be downloaded from

#### Directly from the repository

Just download `jquery.finnishhyphenator.min.js` file from the `dist/` directory.

#### Using Bower to download package

- Install [Bower](http://bower.io/) if you don’t already have it around.
- Install Finnish Hyphenator:

	`bower install finnish-hyphenator`



### Downloading the latest changes

The unreleased development files can be obtained by:

 1. [Downloading](https://github.com/vepasto/finnish-hyphenator/archive/master.zip) or Forking this repository
 2. [Setup the build](CONTRIBUTING.md#build-setup)
 3. Run `grunt` to create the built files in the "dist" directory



## Usage

### Including on your page

#### With jQuery
1. Include jQuery:

	```html
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	```

2. Include plugin's code:

	```html
	<script type="text/javascript" src="../dist/jquery.finnishhyphenator.min.js"></script>
	```

3. Call the plugin:

	```javascript
	$(".elements").finnishHyphenator();
	```

#### Without jQuery
1. Include plugin's code:

	```html
	<script type="text/javascript" src="../dist/finnishhyphenator.min.js"></script>
	```
2. Call the plugin:

	```javascript
	var finHyph = new FinnishHyphenator();
	var hyphenated = finHyph.hyphenateText("Suomenkielinen teksti");
	```
OR

	```javascript
	var finHyph = new FinnishHyphenator();
	var elements = document.getElementsByClassName("classname");
	finHyph.hyphenateElements(elements);
	```

## Reporting an Issue

1. Make sure the problem you're addressing is reproducible.
2. Use http://jsbin.com or http://jsfiddle.net to provide a test page.
3. Indicate what browsers the issue can be reproduced in. **Note: IE Compatibilty mode issues will not be addressed.**
4. What version of the plug-in is the issue reproducible in. Is it reproducible after updating to the latest version.


## Contributing

See the [Contributing Guide](CONTRIBUTING.md)


## License

Copyright © 2014 Veikko Karsikko.
Licensed under the MIT license.

