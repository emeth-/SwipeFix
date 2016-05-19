module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        less: {
            development: {
                options: {
                    compress: false,
                    stdout: true,
                    stderr: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'less',
                        src: ['main.less'],
                        dest: 'css',
                        ext: '.css'
                    }
                ]
            }
        },

        handlebars: {
            compile: {
                options: {
                    namespace: "TEMPLATES"
                },
                files: {
                    'tmp/compiledTemplates.js': ['tmp/**/*.hbs']
                }
            }
        },

        watch: {
            less: {
                files: 'less/**/*.less',
                tasks: ['less:development']
            },
            handlebars: {
                files: 'tmp/**/*.hbs',
                tasks: ['handlebars:compile', 'concat:dist']
            },
            css: {
                files: ['css/main.css'],
                tasks: ['concat:css'],
                options: {
                    /*livereload: {
                        port: 9000
                    }*/
                }
            },
            scripts: {
                files: ['js/**/*.js', '!js/dist/**/*.js', 'Gruntfile.js', 'tmp/**/*.js'],
                tasks: ['concat:dist'],
                options: {
                    spawn: false
                }
            }
        },

        concat: {
            dist: {
                src: [
                    'js/modernizr.js',
                    'node_modules/jquery/dist/jquery.min.js',
                    'node_modules/underscore/underscore-min.js',
                    'node_modules/backbone/backbone-min.js',
                    'js/hammer2.js',
                    'js/caro.js',
                    'node_modules/moment/min/moment.min.js',
                    'node_modules/handlebars/dist/handlebars.runtime.min.js',
                    'tmp/compiledTemplates.js',
                    'js/helpers.js',
                    'node_modules/bootstrap/dist/js/bootstrap.min.js',
                    'js/boot.js',
                    'js/modalView.js',
                    'js/mainView.js',
                    'js/router.js',
                    'js/main.js'
                ],
                dest: 'js/dist/build.js'
            },

            css: {
                src: [
                    'node_modules/bootstrap/dist/css/bootstrap.min.css',
                    'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
                    'css/main.css'
                ],
                dest: 'css/build.css'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-handlebars');

    //compile only
    grunt.registerTask('compile', ['less', 'handlebars', 'concat:dist', 'concat:css']);

    // Default task(s).
    grunt.registerTask('default', ['compile', 'watch']);

};