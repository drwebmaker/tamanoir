/**
 * Created by Artem.Malieiev on 6/10/2015.
 */
module.exports = function (grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        karma: {
            unit: {
                configFile: 'karma.config.js',
                autoWatch: false,
                singleRun: true
            }
        },

        requirejs: {
            compile: {
                options: {
                    baseUrl: 'src',
                    mainConfigFile: 'src/require.config.js',
                    name: 'bower_components/almond/almond',
                    insertRequire: ['main'],
                    include: ['main'],
                    out: 'build/app.js'
                }
            }
        }
    });

    grunt.registerTask('test', ['karma']);
    grunt.registerTask('build', ['requirejs']);
    grunt.registerTask('default', ['test', 'build']);
};