
// Local
var todo = require("../lib/todo.js");

module.exports = function (program) {

  program
    .command('undo <index>')
    .description('Marks task(s) as not done')
    .action(function(index, opts) {

      todo
        .options(program)
        .load()
        .undo(index)
        .write();

      if (!program.quiet) {
        todo.list();

        if (!!program.stats) {
          todo.stats();        
        }
      }

   });

};
