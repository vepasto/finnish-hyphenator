module.exports = function(grunt) {

	grunt.initConfig({
		
		concat: {
			dist_jquery: {
				src: ["src/finnishhyphenator.js", "src/jquery.finnishhyphenator.js"],
				dest: "dist/jquery.finnishhyphenator.js"
			},
			dist_js: {
				src: ["src/finnishhyphenator.js"],
				dest: "dist/finnishhyphenator.js"
			}
		},

		jshint: {
			files: ["src/jquery.finnishhyphenator.js","src/finnishhyphenator.js"],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		uglify: {
			dist_jquery: {
				src: ["dist/jquery.finnishhyphenator.js"],
				dest: "dist/jquery.finnishhyphenator.min.js",
			},
			dist_js: {
				src: ["src/finnishhyphenator.js"],
				dest: "dist/finnishhyphenator.min.js"
			},
		},
	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");

	grunt.registerTask("default", ["jshint", "concat", "uglify"]);
};
