
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

Todo.prototype.list = function(index) {
	var self = this;
    var md = self.md;

	if (this._options.lineNumbers) {
      md = self.md.map(addCount);
    }
    
    if (index) {
         _range(index).forEach(function(i) {
          console.log(md[i - OFFSET]);
        });       
    } else {
        console.log(md.join('\n'));
    }

	return this;
}

function _range(index) {
    var range = [];
    
    function _push(i) {
      if (range.indexOf(i) < 0) range.push(i); 
    }
    
    if (typeof index == 'string') {
        index.split(',').forEach(function(i) {
            i = i.replace('..','-');
            if(i.indexOf('-') > 0) {
                var s = i.split('-');
                for(var ii=+s[0]; ii<=+s[1]; ii++) {
                  _push(ii); 
                }
            } else {
               _push(+i);   
            };
        });
    } else if (typeof index == 'number') {
        _push(index);
    }
    return range;
}

Todo.prototype.do = function(index) {
    var self = this;
    
    _range(index).forEach(function(i) {
      var line = self.md[i - OFFSET];
      if (line) { 
        self.md[i - OFFSET] = line.replace(mPENDING, DONE);
      }
    });

    return this;
}

Todo.prototype.undo = function(index) {
    var self = this;
    
    _range(index).forEach(function(i) {
      var line = self.md[i - OFFSET];
      if (line) { 
        self.md[i - OFFSET] = line.replace(mDONE, PENDING);
      }
    });

    return this;
}

function _decending(a,b){return b-a;}

Todo.prototype.rm = function(index) {
    var self = this;
    
    _range(index).sort(_decending).forEach(function(i) {
      self.md.splice(i - OFFSET,1);
    });

    return this;
}

Todo.prototype.add = function(line, index) {
    var index = (index) ? (index - OFFSET) : this.md.length;
    var lastmd = this.md[index-1] || '';
	var ws = (lastmd.match(mANY)) ? lastmd.match(mPREFIX) : PREFIX;

    this.md.splice(index, 0, ws+PENDING+' '+line);

	return this;
}

Todo.prototype.replace = function(line, index) { // TODO: test
    var index = (index) ? (index - OFFSET) : this.md.length;
    var lastmd = this.md[index] || '';
	var ws = (lastmd.match(mANY)) ? lastmd.match(mPREFIX) : PREFIX;

    this.md.splice(index, 1, ws+PENDING+' '+line);

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
exports.Todo = Todo;

// Get rid of this.

Todo.prototype.getDefaultOptions = function getDefaultOptions(opts) {

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

function addCount(input, index) {
	index = (input.match(mANY)) ? index + OFFSET : '';
	input = input.replace(mPENDING, colors.red);
	input = input.replace(mDONE, colors.green);
	return lpad(index).italic.cyan+" | "+input;
}

function lpad(str) {
	str = String(str);
    while (str.length < LPAD)
        str = " " + str;
    return str;
}