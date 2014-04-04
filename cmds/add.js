
// Local
var todo = require('../lib/todo.js');

module.exports = function (program) {
  'use strict';

  program
    .command('add <text_to_add> [index]')  // TODO: Push to index, to section
    .description('Adds text_to_add to your todo file on its own line.')
    .action(function(text, index) {

      todo
        .options(program)
        .load()
        .add(text, index)
        .write();

      if (!program.quiet) {
        todo.list();

        if (!!program.stats) {
          todo.stats();        
        }
      }

    });

};
