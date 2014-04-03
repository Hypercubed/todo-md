
// Node.js
var path            = require('path');
var fs              = require('fs');

// Local
var todo = require("../lib/todo.js");

module.exports = function (program) {

	program
	   .command('list [index]')
	   .description('Displays all the lines in todo list with line numbers')
	   //.option('-i, --input <file>')
	   .action(function(index, opts) {
	   		//console.log(this); //arguments[arguments.length-1]);
	   		//console.log(opts);

	   		todo
	   			.options(program)
				.load()
				.list(index);

	   });
    
	program
	   .command('print [index]')
	   .description('Prints lines from todo list without line numbers')
	   //.option('-i, --input <file>')
	   .action(function(index, opts) {
           
            program.lineNumbers = false;
	   		
            todo
	   			.options(program)
				.load()
                .list(index);

	   });
	
};