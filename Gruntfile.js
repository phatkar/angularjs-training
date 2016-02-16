module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

  	    //read the package file
        pkg: grunt.file.readJSON('package.json'),

        connect: {
            server: {
                options: {
                    port: 1337
                }
            }
        },

    });

    // Load the plugins.
    grunt.loadNpmTasks('grunt-connect');

    grunt.registerTask('default', ['connect']);

};
