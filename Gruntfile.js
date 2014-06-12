module.exports = function(grunt) {

	grunt.initConfig({
		
		concat: {
			dist: {
				src: ["src/jquery.finnishhyphenator.js"],
				dest: "dist/jquery.finnishhyphenator.js"
			}
		},

		jshint: {
			files: ["src/jquery.finnishhyphenator.js"],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		uglify: {
			my_target: {
				src: ["dist/jquery.finnishhyphenator.js"],
				dest: "dist/jquery.finnishhyphenator.min.js"
			}
		},
	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");

	grunt.registerTask("default", ["jshint", "concat", "uglify"]);
};
