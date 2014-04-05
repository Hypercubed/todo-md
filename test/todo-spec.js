'use strict';

/* global it */
/* global describe */
/* global beforeEach */

var assert = require('assert');
var path = require('path');

describe('todo API', function () {
  var todo = require('../');

  it('should be an Todo instance', function () {
    assert(todo instanceof todo.Todo, 'Expected instance of Todo');
  });

  it('should start empty', function () {
    assert.strictEqual(todo.md.length, 0);
  });
});

describe('todo API functions', function () {

  var todo = require('../');

  beforeEach(function(){
    process.chdir(path.join(__dirname));
    todo.load('./fixtures/todo.md');
  });

  it('should load from file', function () {
    assert.strictEqual(todo.md.length, 4);
    assert.strictEqual(todo.md[0], '- [ ] Task 1');
    assert.strictEqual(todo.md[1], '- [x] Task 2');
    assert.strictEqual(todo.md[2], '- [ ] Task 3');
    assert.strictEqual(todo.md[3], '- [x] Task 4');
  });

  it('add should create new tasks and return index', function () {
    assert.strictEqual(todo.add('Task 5'), 5);
    assert.strictEqual(todo.md.length, 5);
    assert.strictEqual(todo.md[0], '- [ ] Task 1');
    assert.strictEqual(todo.md[1], '- [x] Task 2');
    assert.strictEqual(todo.md[2], '- [ ] Task 3');
    assert.strictEqual(todo.md[3], '- [x] Task 4');
    assert.strictEqual(todo.md[4], '- [ ] Task 5');
  });

  it('add should accept an index', function () {
    assert.strictEqual(todo.add('Task 5', 3), 3);
    assert.strictEqual(todo.md.length, 5);
    assert.strictEqual(todo.md[0], '- [ ] Task 1');
    assert.strictEqual(todo.md[1], '- [x] Task 2');
    assert.strictEqual(todo.md[2], '- [ ] Task 5');
    assert.strictEqual(todo.md[3], '- [ ] Task 3');
    assert.strictEqual(todo.md[4], '- [x] Task 4');

  });

  it('do should mark a task', function () {
    assert(todo.do(3) instanceof todo.Todo, 'Expected instance of Todo');
    assert.strictEqual(todo.md[0], '- [ ] Task 1');
    assert.strictEqual(todo.md[1], '- [x] Task 2');
    assert.strictEqual(todo.md[2], '- [x] Task 3');
    assert.strictEqual(todo.md[3], '- [x] Task 4');
  });

  it('do should work with lists', function () {
    assert(todo.do('1,3-4') instanceof todo.Todo, 'Expected instance of Todo');
    assert.strictEqual(todo.md[0], '- [x] Task 1');
    assert.strictEqual(todo.md[1], '- [x] Task 2');
    assert.strictEqual(todo.md[2], '- [x] Task 3');
    assert.strictEqual(todo.md[3], '- [x] Task 4');
  });

  it('undo should unmark a task', function () {
    assert(todo.undo(2) instanceof todo.Todo, 'Expected instance of Todo');
    assert.strictEqual(todo.md[0], '- [ ] Task 1');
    assert.strictEqual(todo.md[1], '- [ ] Task 2');
    assert.strictEqual(todo.md[2], '- [ ] Task 3');
    assert.strictEqual(todo.md[3], '- [x] Task 4');
  });

  it('undo should work with lists', function () {
    assert(todo.undo('3-4') instanceof todo.Todo, 'Expected instance of Todo');
    assert.strictEqual(todo.md[0], '- [ ] Task 1');
    assert.strictEqual(todo.md[1], '- [x] Task 2');
    assert.strictEqual(todo.md[2], '- [ ] Task 3');
    assert.strictEqual(todo.md[3], '- [ ] Task 4');
  });

  it('rm should remove a task', function () {
    assert(todo.rm(2) instanceof todo.Todo, 'Expected instance of Todo');
    assert.strictEqual(todo.md.length, 3);
    assert.strictEqual(todo.md[0], '- [ ] Task 1');
    assert.strictEqual(todo.md[1], '- [ ] Task 3');
    assert.strictEqual(todo.md[2], '- [x] Task 4');
  });

  it('rm should work with lists', function () {
    assert(todo.rm('1,3-4') instanceof todo.Todo, 'Expected instance of Todo');
    assert.strictEqual(todo.md.length, 1);
    assert.strictEqual(todo.md[0], '- [x] Task 2');
  });




});
