
var path            = require('path');
var fs              = require('fs');

module.exports = todo = {};

todo.getDefaultOptions = function getDefaultOptions(program, opts) {
	  opts = opts || {};
	  opts.debug = opts.debug || false;

	  if (!opts.input)
	  	opts.input = (program.global) ? path.join(__dirname, '../todo.md') : path.join(process.cwd(), 'todo.md');

	  if (!opts.output)
	  	opts.output = opts.input;

	  return opts;
	}

todo.readTodo = function readTodo(filepath) {
		return fs.readFileSync(filepath, "utf-8")
			.trim()
			.split(/\n/);
	}

todo.addCount = function addCount(input, index) {
		index = (input.match(/\[[\s\txX]+\]/)) ? index : '';
	  return todo.lpad(index)+" | "+input;
	}

todo.markDone = function markDone(input) {
	  return input.replace(/\[[\s\t]+\]/, '[x]');
	}

todo.markNotDone = function markNotDone(input) {
	  return input.replace(/\[[xX]+\]/, '[ ]');
	}

todo.lpad = function lpad(str) {
		str = String(str);
	    while (str.length < 6)
	        str = " " + str;
	    return str;
	} 