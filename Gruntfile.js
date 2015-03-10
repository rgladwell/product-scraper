'use strict';

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    var config = {
        app: '',
        dist: 'dist'
    };

    grunt.initConfig({

        config: config,

        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                hostname: 'localhost'
            },
            test: {
                options: {
                    open: false,
                    base: [
                        './',
                        '<%= config.app %>'
                    ]
                }
            }
        },

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= config.dist %>/*',
                        '!<%= config.dist %>/.git*'
                    ]
                }]
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                'product-scraper.js',
                'test/spec/{,*/}*.js'
            ]
        },

        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://localhost:<%= connect.options.port %>/test/index.html']
                }
            }
        },

        uglify: {
            dist: {
                files: {
                    '<%= config.dist %>/product-scraper.js': [
                        '<%= config.dist %>/product-scraper.js'
                    ]
                }
            }
        },

        concat: {
            dist: {}
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: [
                        'product-scraper.js'
                    ]
                }]
            }
        }
    });

    grunt.registerTask('test', [
        'connect:test',
        'mocha'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'copy',
        'uglify'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'build',
        'test'
    ]);
};
