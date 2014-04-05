module.exports = function(grunt){
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: { jshintrc: true },
      all: ['gruntfile.js', 'lib/*.js', 'bin/*', 'test/*.js']
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/*.js'],
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('default', ['jshint','test']);

};
