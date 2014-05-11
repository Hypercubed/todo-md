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
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('default', ['jshint', 'mochaTest']);
  grunt.registerTask('publish', ['jshint', 'mochaTest', 'release']);

};
