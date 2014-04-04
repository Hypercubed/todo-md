
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
var mLINENUMBERS = /^[\s\d]+|/;

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

      this.md = [
        "# Todo list",
        "",
        "_\\( managed using [todo-md](https://github.com/Hypercubed/todo-md) \\)_",
        ""
      ];

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
  var md = this.md;

  if (this._options.lineNumbers) {
    md = self.md.map(addCount);
  }

  if (this._options.color) {
    md = md.map(addColor);
  }

  if (index) {
     _range(index).forEach(function(i) {
      console.log(md[i - OFFSET]);
    });
  } else {
    console.log(md.join('\n'));
  }

  console.log('');

  return this;
}

Todo.prototype.stats = function() {

  var stats;
  var t=0;
  var p=0;
  var d=0;

  this.md.forEach(function(l) {
    if (l.match(mANY)) t+=1;
    if (l.match(mPENDING)) p+=1;
    if (l.match(mDONE)) d+=1;
  });

  stats = [
    t+' tasks',
    d+' done',
    p+' pending'
  ];    

  if (this._options.color) {
    stats[0] = colors.cyan(stats[0]);
    stats[1] = colors.green(stats[1]);
    stats[2] = colors.red(stats[2]);
  }

  console.log(stats.join(', '), 'in '+this._options.input);

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
  this._options.color = !!_opts.color;
  this._options.stats = !!_opts.stats;

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
  return lpad(index)+" | "+input;
}

function addColor(input, index) {
  input = input.replace(mPENDING, colors.red);
  input = input.replace(mDONE, colors.green);
  input = input.replace(mLINENUMBERS, colors.cyan);
  return input;
}

function lpad(str, width, fill) {
  var width, fill;

  if (typeof width == "string") {
    var t = width;
    width = fill;
    fill = t;
  }

  width = width || LPAD;
  fill = fill || ' ';

  str = String(str);
  var len = Math.max(0, width - str.length);
  return Array(len + 1).join(fill)+str;
}
