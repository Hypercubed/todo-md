
// Node.js
//var path            = require('path');
//var fs              = require('fs');

// Local
var todo = require('../lib/todo.js');

module.exports = function (program) {
  'use strict';

  program
    .command('list [index]')
    .description('Displays all the lines in todo list with line numbers')
    .action(function(index) {

      todo
        .options(program)
        .load()
        .list(index);

      if (!!program.stats) {
        todo.stats();
      }

    });

  program
    .command('print [index]')
    .description('Prints lines from todo list without line numbers (same as list -CNS)')
    .action(function(index) {

      program.lineNumbers = false;
      program.color = false;

      todo
        .options(program)
        .load()
        .list(index);

    });


  program
    .command('status')
    .description('Prints status')
    .action(function() {

      todo
        .options(program)
        .load()
        .stats();

    });

};
