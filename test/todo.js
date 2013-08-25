var assert = require("assert");
var exec = require('child_process').exec;

describe('todo bin', function(){

	it('--help should run without errors', function(done) {
		exec('node ./bin/todo --help', function (error, stdout, stderr) {
			assert(!error);
			done();
		});
	});

	it('--version should run without errors', function(done) {
		exec('node ./bin/todo --version', function (error, stdout, stderr) {
			assert(!error);
			done();
		});
	});

	it('completion should run without errors', function(done) {
		exec('node ./bin/todo completion', function (error, stdout, stderr) {
			assert(!error);
			done();
		});
	});

	it('config should run without errors', function(done) {
		exec('node ./bin/todo config', function (error, stdout, stderr) {
			assert(!error);
			done();
		});
	});

});