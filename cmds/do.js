
// Local
var todo = require("../lib/todo.js");

module.exports = function (program) {

	program
	   .command('do <index>')
	   .description('Marks task as done')
	   //.option('-i, --input <file>')
	   //.option('-o, --output [file]')
	   .action(function(index, opts) {
	   		
	   		todo
	   			.options(program)
				.load()
				.do(index)
				.write()
				.list();

	   });
	
};