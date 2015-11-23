
// Local
var todo = require('../lib/todo.js');

module.exports = function (program) {
  'use strict';

  program
    .command('undo <index>')
    .description('Marks task(s) as not done')
    .action(function (index) {
      todo
        .options(program)
        .load()
        .undo(index)
        .write();

      if (!program.quiet) {
        todo.list();

        if (program.stats) {
          todo.stats();
        }
      }
    });
};
