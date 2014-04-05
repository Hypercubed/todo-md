
// Local
var todo = require('../lib/todo.js');

module.exports = function (program) {
  'use strict';

  program
    .command('mv <from> <to>')
    .description('Move a task')
    .action(function(from,to) {

      todo
        .options(program)
        .load()
        .move(from,to)
        .write();

      if (!program.quiet) {
        todo.list();

        if (!!program.stats) {
          todo.stats();
        }
      }

    });

};
