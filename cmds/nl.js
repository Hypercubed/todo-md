
// Node.js
var path            = require('path');
var fs              = require('fs');

// Local
var todo = require("../lib/todo.js");

module.exports = function (program) {

	program
	   .command('nl')
	   .description('Displays all the lines in todo list with line numbers')
	   .option('-i, --input <file>')
	   .action(function(opts){
	   		opts = todo.getDefaultOptions(opts);

			var markdown = todo.readTodo(opts.input);

			console.log(markdown.map(todo.addCount).join('\n'));
	   });
	
};