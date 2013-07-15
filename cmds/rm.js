
// Local
var todo = require("../lib/todo.js");

module.exports = function (program) {

	program
	   .command('rm <index>')
	   .description('Remove a task')
	   //.option('-i, --input [file]')
	   //.option('-o, --output [file]')
	   .action(function(index,opts) {

	   		todo
	   			.options(program)
				.load()
				.rm(index)
				.write()
				.list();

	   });
	
};