//

var LPAD = 6;
var OFFSET = 1;

// TODO: Make this usefull


var path            = require('path');
var fs              = require('fs');

var colors = require('colors');

var mANY = /\[[\s\txX]+\]/;
var mPENDING = /\[[\s\t]+\]/;
var mDONE = /\[[xX]+\]/;
var mPREFIX = /^[^\[]+/;

var PENDING = "[ ]";
var DONE = "[x]";
var PREFIX = "- ";

function Todo() {
	this._options = {};
	this.md = [];
}

Todo.prototype.load = function load(filepath) {
	// TODO: If file doesn't exists?

	try {
	  this.md = fs.readFileSync(filepath || this._options.input, "utf-8")
	  	.trim()
		.split(/\n/);
	} catch (e) {
		if (e.code === 'ENOENT') {
		  console.log('File not found!');
		  this.md = [];
		} else {
		  throw e;
		}
	};

	return this;
}

Todo.prototype.write = function write(filepath) {
	fs.writeFile(filepath || this._options.output, this.md.join('\n'))

	return this;
}

Todo.prototype.list = function(lineNumbers) {
	var md = this.md;

	if (lineNumbers || this._options.lineNumbers)
		md = md.map(addCount);

	console.log(md.join('\n'));
	return this;
}

Todo.prototype.do = function(index) {
	var md = this.md[index - OFFSET];

	if (md)
		this.md[index - OFFSET] = md.replace(mPENDING, DONE);

	return this;
}

Todo.prototype.undo = function(index) {
	var md = this.md[index - OFFSET];

	if (md)
		this.md[index - OFFSET] = md.replace(mDONE, PENDING);

	return this;
}

// todo: handle index array
Todo.prototype.rm = function(index) {

	this.md.splice(index - OFFSET,1);

	return this;
}


// todo: handle index
Todo.prototype.add = function(line) {
	var lastmd = this.md[this.md.length-1] || '';
	var ws = (lastmd.match(mANY)) ? lastmd.match(mPREFIX) : PREFIX;
	this.md.push(ws+PENDING+' '+line+'\n');

	return this;
}

Todo.prototype.options = function(_opts) {  //TODO: Don't overwrite existing options

	  this._options = {};
	  this._options.debug = _opts.debug || false;
	  this._options.cwd = (_opts.global) ? (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) : process.cwd();
	  this._options.input = _opts.input || path.join(this._options.cwd, 'todo.md');
	  this._options.output = _opts.output || this._options.input;
	  this._options.lineNumbers = !!_opts.lineNumbers;

	  return this;
	}

exports = module.exports = new Todo;


// Get rid of this.

Todo.prototype.getDefaultOptions = function getDefaultOptions(opts) {
		console.log(opts);

	  opts = opts || {};
	  opts.debug = opts.debug || false;

	  //console.log(opts);

	  if (!opts.input)
	  	opts.input = (opts.global || opts.parent.global) ? path.join(__dirname, '../todo.md') : path.join(process.cwd(), 'todo.md');

	  // Setting to use todo in user path: process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;

	  if (!opts.output)
	  	opts.output = opts.input;

	  return opts;
	}

/* Todo.prototype.readTodo = readTodo = function readTodo(filepath) {
		return fs.readFileSync(filepath, "utf-8")
			.trim()
			.split(/\n/);
	} */

function addCount(input, index) {
	index = (input.match(mANY)) ? index + OFFSET : '';
	input = input.replace(mPENDING, colors.red);
	input = input.replace(mDONE, colors.green);
	return lpad(index).italic.cyan+" | "+input;
}

/* Todo.prototype.markDone = function markDone(input) {
	  return input.replace(/\[[\s\t]+\]/, '[x]');
	}

Todo.prototype.markNotDone = function markNotDone(input) {
	  return input.replace(/\[[xX]+\]/, '[ ]');
	} */

function lpad(str) {
	str = String(str);
    while (str.length < LPAD)
        str = " " + str;
    return str;
}
