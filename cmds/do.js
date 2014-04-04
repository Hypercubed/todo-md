
// Local
var todo = require("../lib/todo.js");

module.exports = function (program) {

  program
    .command('do <index>')
    .description('Marks task(s) as done')
    .action(function(index, opts) {

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
