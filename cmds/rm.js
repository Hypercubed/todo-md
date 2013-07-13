// Node.js
var path            = require('path');
var fs              = require('fs');

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

			var markdown = todo.readTodo(opts.input)
			markdown.splice(index,1);

			if (opts.output)
				fs.writeFile(opts.output, markdown.join('\n'));

			console.log(markdown.map(todo.addCount).join('\n'));

	   });
	
};