
// Node.js
var path            = require('path');
var fs              = require('fs');

// Local
var todo = require("../lib/todo.js");

module.exports = function (program) {

  program
    .command('list [index]')
    .description('Displays all the lines in todo list with line numbers')
    .action(function(index, opts) {

      todo
        .options(program)
        .load()
        .list(index);

      if (!!program.stats) {
        todo  
          .stats();        
      }

    });

  program
    .command('print [index]')
    .description('Prints lines from todo list without line numbers (same as list -CNS)')
    .action(function(index, opts) {

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
    .action(function(opts) {

      todo
        .options(program)
        .load()
        .stats();

    });

};
