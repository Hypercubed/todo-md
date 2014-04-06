'use strict';

/* global it */
/* global describe */
/* global beforeEach */

var assert = require('assert');
var path = require('path');
var should = require('should');

describe('todo API', function () {
  var todo = require('../');

  it('should be an Todo instance', function () {
    todo.should.be.an.instanceOf(todo.Todo);
  });

  it('should start empty', function () {
    todo.md.should.be.empty;
  });
});

describe('todo API functions', function () {

  var todo = require('../');

  beforeEach(function(){
    process.chdir(path.join(__dirname));
    todo.load('./fixtures/todo.md');
  });

  it('should load from file', function () {
    todo.md.should.have.lengthOf(4);
    todo.md[0].should.be.exactly('- [ ] Task 1');
    todo.md[1].should.be.exactly('- [x] Task 2');
    todo.md[2].should.be.exactly('- [ ] Task 3');
    todo.md[3].should.be.exactly('- [x] Task 4');
  });

  it('add should create new tasks and return index', function () {
    todo.add('Task 5').should.be.exactly(5);
    todo.md.should.have.lengthOf(5);
    todo.md[0].should.be.exactly('- [ ] Task 1');
    todo.md[1].should.be.exactly('- [x] Task 2');
    todo.md[2].should.be.exactly('- [ ] Task 3');
    todo.md[3].should.be.exactly('- [x] Task 4');
    todo.md[4].should.be.exactly('- [ ] Task 5');
  });

  it('add should accept an index', function () {
    todo.add('Task 5',3).should.be.exactly(3);
    todo.md.should.have.lengthOf(5);
    todo.md[0].should.be.exactly('- [ ] Task 1');
    todo.md[1].should.be.exactly('- [x] Task 2');
    todo.md[2].should.be.exactly('- [ ] Task 5');
    todo.md[3].should.be.exactly('- [ ] Task 3');
    todo.md[4].should.be.exactly('- [x] Task 4');
  });

  it('add should accept an out of bound index', function () {  // Should it pad?
    todo.add('Task 5',10).should.be.exactly(5);
    todo.md.should.have.lengthOf(5);
    todo.md[0].should.be.exactly('- [ ] Task 1');
    todo.md[1].should.be.exactly('- [x] Task 2');
    todo.md[2].should.be.exactly('- [ ] Task 3');
    todo.md[3].should.be.exactly('- [x] Task 4');
    todo.md[4].should.be.exactly('- [ ] Task 5');
  });

  it('do should mark a task', function () {
    todo.do(3).should.be.an.instanceOf(todo.Todo);
    todo.md[0].should.be.exactly('- [ ] Task 1');
    todo.md[1].should.be.exactly('- [x] Task 2');
    todo.md[2].should.be.exactly('- [x] Task 3');
    todo.md[3].should.be.exactly('- [x] Task 4');
  });

  it('do should work with lists', function () {
    todo.do('1,3-4').should.be.an.instanceOf(todo.Todo);
    todo.md[0].should.be.exactly('- [x] Task 1');
    todo.md[1].should.be.exactly('- [x] Task 2');
    todo.md[2].should.be.exactly('- [x] Task 3');
    todo.md[3].should.be.exactly('- [x] Task 4');
  });

  it('do should accept an out of bound index', function () {
    todo.do('1000').should.be.an.instanceOf(todo.Todo);
    todo.md[0].should.be.exactly('- [ ] Task 1');
    todo.md[1].should.be.exactly('- [x] Task 2');
    todo.md[2].should.be.exactly('- [ ] Task 3');
    todo.md[3].should.be.exactly('- [x] Task 4');
  });

  it('undo should unmark a task', function () {
    todo.undo(2).should.be.an.instanceOf(todo.Todo);
    todo.md[0].should.be.exactly('- [ ] Task 1');
    todo.md[1].should.be.exactly('- [ ] Task 2');
    todo.md[2].should.be.exactly('- [ ] Task 3');
    todo.md[3].should.be.exactly('- [x] Task 4');
  });

  it('undo should work with lists', function () {
    todo.undo('3-4').should.be.an.instanceOf(todo.Todo);
    todo.md[0].should.be.exactly('- [ ] Task 1');
    todo.md[1].should.be.exactly('- [x] Task 2');
    todo.md[2].should.be.exactly('- [ ] Task 3');
    todo.md[3].should.be.exactly('- [ ] Task 4');
  });

  it('undo should accept an out of bound index', function () {
    todo.undo('1000').should.be.an.instanceOf(todo.Todo);
    todo.md[0].should.be.exactly('- [ ] Task 1');
    todo.md[1].should.be.exactly('- [x] Task 2');
    todo.md[2].should.be.exactly('- [ ] Task 3');
    todo.md[3].should.be.exactly('- [x] Task 4');
  });

  it('rm should remove a task', function () {
    todo.rm(2).should.be.an.instanceOf(todo.Todo);
    todo.md.should.have.lengthOf(3);
    todo.md[0].should.be.exactly('- [ ] Task 1');
    todo.md[1].should.be.exactly('- [ ] Task 3');
    todo.md[2].should.be.exactly('- [x] Task 4');
  });

  it('rm should work with lists', function () {
    todo.rm('1,3-4').should.be.an.instanceOf(todo.Todo);
    todo.md.should.have.lengthOf(1);
    todo.md[0].should.be.exactly('- [x] Task 2');
  });

  it('rm should accept an out of bound index', function () {
    todo.rm('1000').should.be.an.instanceOf(todo.Todo);
    todo.md[0].should.be.exactly('- [ ] Task 1');
    todo.md[1].should.be.exactly('- [x] Task 2');
    todo.md[2].should.be.exactly('- [ ] Task 3');
    todo.md[3].should.be.exactly('- [x] Task 4');
  });

  it('move should move a task when from > to', function () {
    todo.move(4,1).should.be.an.instanceOf(todo.Todo);
    todo.md[0].should.be.exactly('- [x] Task 4');
    todo.md[1].should.be.exactly('- [ ] Task 1');
    todo.md[2].should.be.exactly('- [x] Task 2');
    todo.md[3].should.be.exactly('- [ ] Task 3');
  });

  it('move should move a task when to > from', function () {
    todo.move(1,4).should.be.an.instanceOf(todo.Todo);
    todo.md[0].should.be.exactly('- [x] Task 2');
    todo.md[1].should.be.exactly('- [ ] Task 3');
    todo.md[2].should.be.exactly('- [x] Task 4');
    todo.md[3].should.be.exactly('- [ ] Task 1');
  });

  it('move should accept out of bounds from index', function () {
    todo.move(10,2).should.be.an.instanceOf(todo.Todo);
    todo.md[0].should.be.exactly('- [ ] Task 1');
    todo.md[1].should.be.exactly('- [x] Task 2');
    todo.md[2].should.be.exactly('- [ ] Task 3');
    todo.md[3].should.be.exactly('- [x] Task 4');
  });


  it('move should accept out of bounds to index', function () {
    todo.move(2,10).should.be.an.instanceOf(todo.Todo);
    todo.md[0].should.be.exactly('- [ ] Task 1');
    todo.md[1].should.be.exactly('- [ ] Task 3');
    todo.md[2].should.be.exactly('- [x] Task 4');
    todo.md[3].should.be.exactly('- [x] Task 2');
  });

});
