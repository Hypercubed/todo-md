
// Local
var todo = require('../lib/todo.js');

module.exports = function (program) {
  'use strict';

  program
    .command('add <text_to_add> [index]')  // TODO: Push to index, to section
    .description('Adds text_to_add to your todo file on its own line.')
    .option('-D, --done')
    .action(function(text, index, opts) {

      var idx = todo
          .options(program)
          .load()
          .add(text, index);

      if (opts.done) {
          todo
            .do(idx);
      }

      todo
        .write();

      if (!program.quiet) {
        todo.list();

        if (!!program.stats) {
          todo.stats();
        }
      }

    });

};
