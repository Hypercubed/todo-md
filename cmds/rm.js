
// Local
var todo = require('../lib/todo.js');

module.exports = function (program) {
  'use strict';

  program
    .command('rm <index>')
    .description('Remove task(s)')
    .action(function(index) {

      todo
        .options(program)
        .load()
        .rm(index)
        .write();

      if (!program.quiet) {
        todo.list();

        if (!!program.stats) {
          todo.stats();        
        }
      }

    });

};
