
// Local
var todo = require('../lib/todo.js');

module.exports = function (program) {
  'use strict';

  program
    .command('indent <index> [level]')
    .description('Indents a range of tasks')
    .action(function (index, level) {
      if (level === undefined) { level = 1; }

      todo
        .options(program)
        .load()
        .indent(index, level)
        .write();

      if (!program.quiet) {
        todo.list();

        if (program.stats) {
          todo.stats();
        }
      }
    });

  program
    .command('unindent <index> [level]')
    .description('Unindents a range of tasks')
    .action(function (index, level) {
      if (level === undefined) { level = -1; }

      todo
        .options(program)
        .load()
        .indent(index, -level)
        .write();

      if (!program.quiet) {
        todo.list();

        if (program.stats) {
          todo.stats();
        }
      }
    });
};
