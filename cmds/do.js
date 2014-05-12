
// Local
var todo = require('../lib/todo.js');

module.exports = function (program) {
  'use strict';

  program
    .command('do <index>')
    .description('Marks task(s) as done')
    .action(function(index) {

      todo
        .options(program)
        .load()
        .do(index)
        .write();

      if (!program.quiet) {
        todo.list();

        if (!!program.stats) {
          todo.stats();
        }
      }

    });

};
