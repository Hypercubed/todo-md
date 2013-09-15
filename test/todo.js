'use strict';

var assert = require("assert");
var exec = require('child_process').exec;
var path = require('path');
var mkdirp = require('mkdirp');


describe('todo API', function () {
	var todo = require("../");

	it('should be an Todo instance', function () {
		assert(todo instanceof todo.Todo);
	});

});

describe('todo bin', function(){
	var cmd = 'node '+path.join(__dirname, '../bin/todo')+' ';
	console.log(cmd);

	mkdirp.sync('temp');
	process.chdir('temp');

	it('--help should run without errors', function(done) {
		exec(cmd+'--help', function (error, stdout, stderr) {
			assert(!error);
			done();
		});
	});

	it('--version should run without errors', function(done) {
		exec(cmd+'--version', function (error, stdout, stderr) {
			assert(!error);
			done();
		});
	});

	it('should NOT return error on missing command', function(done) {
        this.timeout(4000);

		exec(cmd, function (error, stdout, stderr) {
			assert(!error);
			done();
		});

	});

	it('should NOT return error on unknown command', function(done) {
        this.timeout(4000);

		exec(cmd+'junkcmd', function (error, stdout, stderr) {
			assert(!error);
			done();
		});
	});
});
