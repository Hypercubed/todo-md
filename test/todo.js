'use strict';

/* global it */
/* global describe */

var assert = require('assert');
var exec = require('child_process').exec;
var path = require('path');
var mkdirp = require('mkdirp');


describe('todo API', function () {
  var todo = require('../');

  it('should be an Todo instance', function () {
    assert(todo instanceof todo.Todo);
  });

});

describe('todo bin', function(){
  var cmd = 'node '+path.join(__dirname, '../bin/todo')+' ';

  mkdirp.sync('test/temp');
  process.chdir('test/temp');

  it('--help should run without errors', function(done) {
    exec(cmd+'--help', function (error) {
      assert(!error);
      done();
    });
  });

  it('--version should run without errors', function(done) {
    exec(cmd+'--version', function (error) {
      assert(!error);
      done();
    });
  });

  it('should NOT return error on missing command', function(done) {
    this.timeout(4000);

    exec(cmd, function (error) {
      assert(!error);
      done();
    });

  });

  it('should NOT return error on unknown command', function(done) {
    this.timeout(4000);

    exec(cmd+'"A task"', function (error) {
      assert(!error);
      done();
    });
  });

  it('should NOT return error on add command', function(done) {
    this.timeout(4000);

    exec(cmd+'add "Another task"', function (error) {
      assert(!error);
      done();
    });

  });

  it('should NOT return error on do command', function(done) {
    this.timeout(4000);

    exec(cmd+'do 1,2-5', function (error) {
      assert(!error);
      done();
    });
  });

  it('should NOT return error on undo command', function(done) {
    this.timeout(4000);

    exec(cmd+'undo 1,2-5', function (error) {
      assert(!error);
      done();
    });
  });

  it('should NOT return error on rm command', function(done) {
    this.timeout(4000);

    exec(cmd+'rm 2', function (error) {
      assert(!error);
      done();
    });
  });

});
