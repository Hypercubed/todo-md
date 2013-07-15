// TODO: Make thsi usefull


var path            = require('path');
var fs              = require('fs');

function Todo() {
	this._options = {};
	this.md = [];
}

Todo.prototype.load = function load(filepath) {
	// TODO: If file doesn't exists?

	this.md = fs.readFileSync(filepath || this._options.input, "utf-8")
			.trim()
			.split(/\n/);

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
	var md = this.md[index];

	if (md)
		this.md[index] = md.replace(/\[[\s\t]+\]/, '[x]');

	return this;
}

Todo.prototype.undo = function(index) {
	var md = this.md[index];

	if (md)
		this.md[index] = md.replace(/\[[xX]+\]/, '[ ]');

	return this;
}

// todo: handle index array
Todo.prototype.rm = function(index) {

	this.md.splice(index,1);

	return this;
}


// todo: handle index
Todo.prototype.add = function(line) {

	var ws = this.md[this.md.length-1].match(/^[^\[]+/) || '';
	this.md.push(ws+'[ ] '+line+'\n');

	return this;
}

Todo.prototype.options = function(_opts) {

	  this._options = {};
	  this._options.debug = _opts.debug || false;
	  this._options.cwd = (_opts.global) ? path.join(__dirname, '..') : process.cwd();
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
	index = (input.match(/\[[\s\txX]+\]/)) ? index : '';
	return lpad(index)+" | "+input;
}

/* Todo.prototype.markDone = function markDone(input) {
	  return input.replace(/\[[\s\t]+\]/, '[x]');
	}

Todo.prototype.markNotDone = function markNotDone(input) {
	  return input.replace(/\[[xX]+\]/, '[ ]');
	} */

function lpad(str) {
		str = String(str);
	    while (str.length < 6)
	        str = " " + str;
	    return str;
	}