
// Node.js
var path            = require('path');
var fs              = require('fs');

// Local
var todo = require("../lib/todo.js");

module.exports = function (program) {

	program
	   .command('list')
	   .description('Displays all the lines in todo list with line numbers')
	   .option('-i, --input <file>')
	   .action(function(opts) {
	   		//console.log(this); //arguments[arguments.length-1]);
	   		console.log(opts);

	   		var opts = todo.getDefaultOptions(opts);



			todo.load(opts.input).list(program.lineNumbers);

			//if (program.lineNumbers)
			//	markdown = markdown.map(todo.addCount);

			//console.log(markdown.join('\n'));
	   });
	
};