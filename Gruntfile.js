/**
 * Created by Artem.Malieiev on 6/10/2015.
 */
module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        karma: {
            unit: {
                configFile: 'karma.config.js',
                autoWatch: true
            }
        }
    });
    grunt.loadNpmTasks('grunt-karma');
    grunt.registerTask('default', ['karma']);
};