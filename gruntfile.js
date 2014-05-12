module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: { jshintrc: true },
      all: ['gruntfile.js', 'lib/*.js', 'bin/*', 'cmds/*.js', 'test/*.js']
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          clearRequireCache: true
        },
        src: ['test/*.js'],
      }
    },

    watch: {
      js: {
        options: {
          spawn: false,
        },
        files: '**/*.js',
        tasks: ['default']
      }
    },

    assemble: {
      options: {
        pkg: '<%= pkg %>',
        flatten: true,
      },
      gh: {
        files: {
          '.gh-pages/': ['gh-pages/*.hbs']
        }
      }
    },

    clean: [".gh-pages/"],

    'gh-pages': {
      gh: {
        options: {
          base: '.gh-pages',
          branch: 'gh-pages',
          dot: true
        },
        src: '**/*'
      }
    }

  });

  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('assemble' );

  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('default', ['jshint', 'mochaTest']);

  grunt.registerTask('build', ['clean', 'assemble']);
  grunt.registerTask('deploy', ['build', 'gh-pages:gh']);

  grunt.registerTask('publish', ['jshint', 'mochaTest', 'release']);

};
