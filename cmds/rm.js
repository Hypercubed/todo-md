
// Local
var todo = require("../lib/todo.js");

module.exports = function (program) {

	program
	   .command('rm <index>')
	   .description('Remove a task')
	   .option('-i, --input [file]')
	   .option('-o, --output [file]')
	   .action(function(index,opts) {

	   		opts = todo.getDefaultOptions(opts);

	   		// todo: handle range
			todo.load(opts.input).rm(index);

			if (opts.output)
				todo.write(opts.output);

			todo.list(program.lineNumbers);

	   });
	
};