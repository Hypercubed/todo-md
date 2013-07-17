
// Local
var todo = require("../lib/todo.js");

module.exports = function (program) {

	program
	   .command('*')  // TODO: Push to index, to section
	   .description('Adds * to your todo file on its own line.')
	   .action(function(text, opts) {
	   	
	   		program.parse(['', '', 'add', text]);
			
	   });
	   
	program
	   .command('add <text_to_add>')  // TODO: Push to index, to section
	   .description('Adds text_to_add to your todo file on its own line.')
	   .action(function(text, opts) {
	   	
	   		todo
	   			.options(program)
				.load()
				.add(text)
				.write()
				.list();
			
	   });


	
};