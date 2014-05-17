'use strict';

/* global it */
/* global describe */
/* global beforeEach */

//var assert = require('assert');
var path = require('path');
require('should');

describe('todo API', function () {
  var todo = require('../');

  it('should be an Todo instance', function () {
    todo.should.be.an.instanceOf(todo.Todo);
  });

  it('should start empty', function () {
    todo.md.should.eql([]);
  });
});

describe('todo API functions', function () {

  var todo = require('../');

  var _md;

  var fixture = [
    '# Heading',
    '',
    '- [ ] Line 3',
    '  - [x] Line 4',
    '- [ ] Line 5',
    '- [x] Line 6'
  ];

  beforeEach(function(){
    _md = fixture.slice(0);
    todo.md = fixture.slice(0);
  });

  describe('todo.load', function () {
    it('should load from file', function () {
      process.chdir(path.join(__dirname));
      todo.load('./fixtures/todo.md');
      todo.md.should.eql(_md);
      process.chdir('..');
    });

    it('should handle missing file', function () {
      process.chdir(path.join(__dirname));
      todo.load('./fixtures/todo-missing.md');
      todo.md.should.eql([  '# Todo list',
                            '',
                            '_\\( managed using [todo-md](https://github.com/Hypercubed/todo-md) \\)_',
                            '' ]);
      process.chdir('..');
    });
  });

  describe('todo.init', function () {

    it('should work', function () {
      todo.init();
      todo.md.should.eql([  '# Todo list',
                            '',
                            '_\\( managed using [todo-md](https://github.com/Hypercubed/todo-md) \\)_',
                            '' ]);
    });

  });

  describe('todo.add', function () {

    it('should create new tasks and return index', function () {
      todo.add('New').should.be.exactly(7);
      _md.push('- [ ] New');
      todo.md.should.eql(_md);
    });

    it('should accept an index', function () {
      todo.add('New',4).should.be.exactly(4);
      _md.splice(3, 0, '- [ ] New');
      todo.md.should.eql(_md);
    });

    it('should accept an index, with matching indent', function () {
      todo.add('New',5).should.be.exactly(5);
      _md.splice(4, 0, '  - [ ] New');
      todo.md.should.eql(_md);
    });

    it('should accept an out of bound index', function () {  // Should it pad?
      todo.add('New',10).should.be.exactly(7);
      todo.md.should.have.lengthOf(7);
      _md.push('- [ ] New');
      todo.md.should.eql(_md);
    });

    it('should accept an indent level', function () {
      todo.add('New',null,1).should.be.exactly(7);
      _md.push('  - [ ] New');
      todo.md.should.eql(_md);
    });

    it('should accept an indent level', function () {
      todo.add('New',null,2).should.be.exactly(7);
      _md.push('    - [ ] New');
      todo.md.should.eql(_md);
    });

  });

  describe('todo.do', function () {
    it('should mark a task', function () {
      todo.do(5).should.be.an.instanceOf(todo.Todo);
      _md[4] = _md[4].replace('- [ ]','- [x]');
      todo.md.should.eql(_md);
    });

    it('should work with lists', function () {
      todo.do('3-4').should.be.an.instanceOf(todo.Todo);
      _md[2] = _md[2].replace('- [ ]','- [x]');
      _md[3] = _md[3].replace('- [ ]','- [x]');
      todo.md.should.eql(_md);
    });

    it('should accept an out of bound index', function () {
      todo.do(10).should.be.an.instanceOf(todo.Todo);
      todo.md.should.eql(_md);
    });
  });

  describe('todo.undo', function () {
    it('should unmark a task', function () {
      todo.undo(4).should.be.an.instanceOf(todo.Todo);
      _md[3] = _md[3].replace('- [x]','- [ ]');
      todo.md.should.eql(_md);
    });

    it('should work with lists', function () {
      todo.undo('3-4').should.be.an.instanceOf(todo.Todo);
      _md[2] = _md[2].replace('- [x]','- [ ]');
      _md[3] = _md[3].replace('- [x]','- [ ]');
      todo.md.should.eql(_md);
    });

    it('should accept an out of bound index', function () {
      todo.undo(10).should.be.an.instanceOf(todo.Todo);
      todo.md.should.eql(_md);
    });
  });

  describe('todo.rm', function () {
    it('should remove a task', function () {
      todo.rm(4).should.be.an.instanceOf(todo.Todo);
      _md.splice(3, 1);
      todo.md.should.eql(_md);
    });

    it('should work with lists', function () {
      todo.rm('3,5-6').should.be.an.instanceOf(todo.Todo);
      _md.splice(4, 2);
      _md.splice(2, 1);
      todo.md.should.eql(_md);
    });

    it('should accept an out of bound index', function () {
      todo.rm(10).should.be.an.instanceOf(todo.Todo);
      todo.md.should.eql(_md);
    });
  });


  describe('todo.move', function () {
    it('should move a task when from > to', function () {
      todo.move(6,3).should.be.an.instanceOf(todo.Todo);
      _md.splice(2, 0, _md.splice(5, 1)[0]);
      todo.md.should.eql(_md);
    });

    it('should move a task when to > from', function () {
      todo.move(3,6).should.be.an.instanceOf(todo.Todo);
      _md.push(_md.splice(2, 1)[0]);
      todo.md.should.eql(_md);
    });

    it('should accept out of bounds from index', function () {
      todo.move(10,2).should.be.an.instanceOf(todo.Todo);
      todo.md.should.eql(_md);
    });


    it('should accept out of bounds to index', function () {
      todo.move(4,10).should.be.an.instanceOf(todo.Todo);
      _md.push(_md.splice(3, 1)[0]);
      todo.md.should.eql(_md);
    });
  });


});
