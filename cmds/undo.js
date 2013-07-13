// Node.js
var path            = require('path');
var fs              = require('fs');

// Local
var todo = require("../lib/todo.js");

module.exports = function (program) {

	program
	   .command('undo <index>')
	   .description('Marks task as not done')
	   .option('-i, --input [file]')
	   .option('-o, --output [file]')
	   .action(function(index, opts) {
	   		opts = todo.getDefaultOptions(program, opts);

			var markdown = todo.readTodo(opts.input)
				.map(function(line, i) {
					if (i++ == index)
					  line = todo.markNotDone(line);

					return line;
				});

			if (opts.output)
				fs.writeFile(opts.output, markdown.join('\n'));

			if (program.lineNumbers)
				markdown = markdown.map(todo.addCount);

			console.log(markdown.join('\n'));
	   });
	
};