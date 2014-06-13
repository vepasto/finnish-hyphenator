# Contributing to Finnish Hyphenator jQuery plugin

Thanks for contributing! Here's a few guidelines to help your contribution get landed.

1. Make sure the problem you're addressing is reproducible. Use jsbin.com or jsfiddle.net to provide a test page.
2. Follow the [jQuery style guide](http://contribute.jquery.com/style-guides/js)
3. Add or update unit tests along with your patch. Run the unit tests in at least one browser (see below).
4. Run `grunt` (see below) to check for linting and a few other issues.
5. Describe the change in your commit message and reference the ticket, like this: "Fix delegate bug for demo page. Fixes #51".


## Build setup

1. Install [NodeJS](http://nodejs.org).
2. Install the Grunt CLI To install by running `npm install -g grunt-cli`. More details are available on the [Grunt](http://gruntjs.com/getting-started) website.
3. Install the [NPM](https://www.npmjs.org/) dependencies by running `npm install`.
4. The build can now be called by running `grunt`.


## Creating a new Additional Method

**FIXME:** *Write more accurate instructions for contributing…*

If you've wrote custom methods that you'd like to contribute to additional-methods.js:

1. Create a branch
2. Add the method as a new file in src/additional
3. (Optional) Add translations to src/localization
4. Send a pull request to the master branch.


## Unit Tests

**FIXME:** *Tests still missing…*

(To run unit tests, you should have a local webserver installed and pointing at your workspace. Then open `http://localhost/finnish-hyphenator/test` to run the unit tests. Start with one browser while developing the fix, then run against others before committing. Usually latest Chrome, Firefox, Safari and Opera and a few IEs.)


## Linting

To run JSHint and other tools, use `grunt`.
