'use strict';

//

var LPAD = 6;
var OFFSET = 1;

// TODO: Make this usefull

var path  = require('path');
var fs    = require('fs');

var colors = require('colors');

var mANY = /\[[\s\txX]+\]/;
var mPENDING = /\[[\s\t]+\]/;
var mDONE = /\[[xX]+\]/;
var mPREFIX = /^[^\[]+/;
var mLINENUMBERS = /^[\s\d]+|/;

var PENDING = '[ ]';
var DONE = '[x]';
var PREFIX = '- ';
var INDENT = '  ';

function repeat(s, n) {
  return new Array(n+1).join(s);
}

function lpad(str, width, fill) {

  if (typeof width === 'string') {
    var t = width;
    width = fill;
    fill = t;
  }

  width = width || LPAD;
  fill = fill || ' ';

  str = String(str);
  var len = Math.max(0, width - str.length);
  return repeat(fill, len) + str;
}

function addCount(input, index) {
  index = (input.match(mANY)) ? index + OFFSET : '';
  return lpad(index) + ' | ' + input;
}

function addColor(input) {
  input = input.replace(mPENDING, colors.red);
  input = input.replace(mDONE, colors.green);
  input = input.replace(mLINENUMBERS, colors.cyan);
  return input;
}

function _range(index) {
  var range = [];

  function _push(i) {
    if (range.indexOf(i) < 0) { range.push(i); }
  }

  if (typeof index === 'string') {
    index.split(',').forEach(function (i) {
      i = i.replace('..', '-');
      if (i.indexOf('-') > 0) {
        var s = i.split('-');
        for (var ii = +s[0]; ii <= +s[1]; ii++) {
          _push(ii);
        }
      } else {
        _push(+i);
      }
    });
  } else if (typeof index === 'number') {
    _push(index);
  }
  return range;
}

function _replaceRange(md, indexrange, searchvalue, newvalue) {

  _range(indexrange).forEach(function (i) {
    var line = md[i - OFFSET];
    if (line) {
      md[i - OFFSET] = line.replace(searchvalue, newvalue);
    }
  });

}

function Todo() {
  this._options = {};
  this.md = [];
}

Todo.prototype.init = function load() {

  this.md = [
    '# Todo list',
    '',
    '_\\( managed using [todo-md](https:\/\/github.com/Hypercubed/todo-md) \\)_',
    ''
  ];

  return this;
};

Todo.prototype.load = function load(filepath) {
  // TODO: If file doesn't exists?

  try {
    this.md = fs.readFileSync(filepath || this._options.input, 'utf-8')
    .trim()
    .split(/\n/);
  } catch (e) {
    if (e.code === 'ENOENT') {
      console.log('File not found!');

      this.init();

    } else {
      throw e;
    }
  }

  LPAD = Math.max(String(this.md.length).length + 2, 4);  // Todo: make an option.

  return this;
};

Todo.prototype.write = function write(filepath) {
  fs.writeFile(filepath || this._options.output, this.md.join('\n'));

  return this;
};

Todo.prototype.list = function (index) {
  var self = this;
  var md = this.md;

  if (this._options.lineNumbers) {
    md = self.md.map(addCount);
  }

  if (this._options.color) {
    md = md.map(addColor);
  }

  if (index) {
    _range(index).forEach(function (i) {
      console.log(md[i - OFFSET]);
    });
  } else {
    console.log(md.join('\n'));
  }

  console.log('');

  return this;
};

Todo.prototype.stats = function () {

  var stats;
  var t = 0;
  var p = 0;
  var d = 0;

  this.md.forEach(function (l) {
    if (l.match(mANY)) {t++; }
    if (l.match(mPENDING)) {p++; }
    if (l.match(mDONE)) {d++; }
  });

  stats = [
    t + ' tasks',
    d + ' done',
    p + ' pending'
  ];

  if (this._options.color) {
    stats[0] = colors.cyan(stats[0]);
    stats[1] = colors.green(stats[1]);
    stats[2] = colors.red(stats[2]);
  }

  console.log(stats.join(', '), 'in ' + this._options.input);

  return this;
};

Todo.prototype.do = function (index) {
  _replaceRange(this.md, index, mPENDING, DONE);
  return this;
};

Todo.prototype.undo = function (index) {
  _replaceRange(this.md, index, mDONE, PENDING);
  return this;
};

Todo.prototype.indent = function (index, indent) {
  indent = +indent;

  if (indent > 0) {
    _replaceRange(this.md, index, /^([^\[]+)/, repeat(INDENT,indent)+'$1');
  } else if (indent < 0) {
    for (var i=0; i < -indent; i++) {
      _replaceRange(this.md, index, /^\s\s/, '');
    }
  }
  
  return this;
};

function _decending(a, b) { return b - a; }

Todo.prototype.rm = function (index) {
  var self = this;

  _range(index).sort(_decending).forEach(function (i) {
    self.md.splice(i - OFFSET, 1);
  });

  return this;
};

Todo.prototype.add = function (line, index) {
  index = (index) ? (index - OFFSET) : this.md.length;
  if (index > this.md.length) { index = this.md.length; }  // TODO: perhaps should pad?

  var lastmd = this.md[index - 1] || '';
  var ws = (lastmd.match(mANY)) ? lastmd.match(mPREFIX) : PREFIX;

  this.md.splice(index, 0, ws + PENDING + ' ' + line);

  return index + OFFSET;
};

Todo.prototype.move = function (from, to) {  // TODO: from can be indecies, handle indents
  if (from === to || from > this.md.length) {return this; }

  from -= OFFSET;
  to -= OFFSET;

  this.md.splice(to, 0, this.md.splice(from, 1)[0]);

  return this;
};

Todo.prototype.options = function (_opts) {  //TODO: Don't overwrite existing options

  this._options = {};
  this._options.debug = _opts.debug || false;
  this._options.cwd = (_opts.global) ? path.join(process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE, '/todo-md') : process.cwd();
  this._options.input = _opts.input || path.join(this._options.cwd, 'todo.md');
  this._options.output = _opts.output || this._options.input;
  this._options.lineNumbers = !!_opts.lineNumbers;
  this._options.color = !!_opts.color;
  this._options.stats = !!_opts.stats;

  return this;
};

exports = module.exports = new Todo();
exports.Todo = Todo;

// Get rid of this.

/* Todo.prototype.getDefaultOptions = function getDefaultOptions(opts) {

  opts = opts || {};
  opts.debug = opts.debug || false;

  //console.log(opts);

  if (!opts.input) {
    opts.input = (opts.global || opts.parent.global) ? path.join(__dirname, '../todo.md') : path.join(process.cwd(), 'todo.md');
  }

  // Setting to use todo in user path: process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;

  if (!opts.output) {
    opts.output = opts.input;
  }

  return opts;
}; */
