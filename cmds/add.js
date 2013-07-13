// Node.js
var path            = require('path');
var fs              = require('fs');

// Local
var todo = require("../lib/todo.js");

module.exports = function (program) {

	program
	   .command('add <text_to_add>')  // TODO: Push to index, to section
	   .description('Adds text_to_add to your todo file on its own line.')
	   .option('-i, --input [file]')
	   .option('-o, --output [file]')
	   .action(function(text, opts) {
	   		opts = todo.getDefaultOptions(program, opts);

			var markdown = todo.readTodo(opts.input);

			var ws = markdown[markdown.length-1].match(/^[^\[]+/) || '';
			markdown.push(ws+'[ ] '+text+'\n');

			if (opts.output)
				fs.writeFile(opts.output, markdown.join('\n'));

			console.log(markdown.map(todo.addCount).join('\n'));
			
	   });
	
};