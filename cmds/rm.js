
// Local
var todo = require("../lib/todo.js");

module.exports = function (program) {

  program
    .command('rm <index>')
    .description('Remove task(s)')
    .action(function(index,opts) {

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
