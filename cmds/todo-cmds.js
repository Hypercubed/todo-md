
module.exports = function (program) {

	// Node.js
	var path            = require('path');
	var fs              = require('fs');

	// Local
	var pkg             = require('../package.json');	

	program.name = 'todo';

	program.option('-g, --global', "use global todo list");

	//program.action(function() { console.log("TEST"); });

	program.on('--help', function(){
	  console.log('  Bug reports, suggestions, updates:');
	  console.log('  ', pkg.bugs.url);
	});

	program
	   .command('list')
	   .usage('list')
	   .version('0.0.0')
	   .description('Displays all the lines in todo list.')
	   .option('-i, --input <file>')
	   .action(function(opts){
	   		opts = getDefaultOptions(opts);

			var markdown = readTodo(opts.input);
			console.log(markdown.join('\n'));
	   });

	program
	   .command('nl')
	   .description('Displays all the lines in todo list with line numbers')
	   .option('-i, --input <file>')
	   .action(function(opts){
	   		opts = getDefaultOptions(opts);

			var markdown = readTodo(opts.input);

			console.log(markdown.map(addCount).join('\n'));
	   });

	program
	   .command('do <index>')
	   .description('Marks task as done')
	   .option('-i, --input <file>')
	   .option('-o, --output [file]')
	   .action(function(index, opts) {
	   		opts = getDefaultOptions(opts);

			var markdown = readTodo(opts.input)
				.map(function(line, i) {
					if (i++ == index)
					  line = markDone(line);

					return line;
				});

			if (opts.output)
				fs.writeFile(opts.output, markdown.join('\n'));

			console.log(markdown.map(addCount).join('\n'));

	   });

	program
	   .command('undo <index>')
	   .description('Marks task as not done')
	   .option('-i, --input [file]')
	   .option('-o, --output [file]')
	   .action(function(index, opts) {
	   		opts = getDefaultOptions(opts);

			var markdown = readTodo(opts.input)
				.map(function(line, i) {
					if (i++ == index)
					  line = markNotDone(line);

					return line;
				});

			if (opts.output)
				fs.writeFile(opts.output, markdown.join('\n'));

			console.log(markdown.map(addCount).join('\n'));
	   });

	program
	   .command('add <text_to_add>')  // TODO: Push to index, to section
	   .description('Adds text_to_add to your todo file on its own line.')
	   .option('-i, --input [file]')
	   .option('-o, --output [file]')
	   .action(function(text, opts) {
	   		opts = getDefaultOptions(opts);

			var markdown = readTodo(opts.input);

			var ws = markdown[markdown.length-1].match(/^[^\[]+/) || '';
			markdown.push(ws+'[ ] '+text+'\n');

			if (opts.output)
				fs.writeFile(opts.output, markdown.join('\n'));

			console.log(markdown.map(addCount).join('\n'));
			
	   });



	program
	   .command('rm <index>')
	   .description('Remove a task')
	   .option('-i, --input [file]')
	   .option('-o, --output [file]')
	   .action(function(index,opts) {
	   		opts = getDefaultOptions(opts);

			var markdown = readTodo(opts.input)
			markdown.splice(index,1);

			if (opts.output)
				fs.writeFile(opts.output, markdown.join('\n'));

			console.log(markdown.map(addCount).join('\n'));

	   });

	//program
	//   .command('test')
	//   .description('Remove a task')
	//   .action(function(args) {
	//   		program.emit('nl', program.args);
	//   });

	function getDefaultOptions(opts) {
	  opts = opts || {};
	  opts.debug = opts.debug || false;

	  if (!opts.input)
	  	opts.input = (program.global) ? path.join(__dirname, '../todo.md') : path.join(process.cwd(), 'todo.md');

	  if (!opts.output)
	  	opts.output = opts.input;

	  return opts;
	}

	function readTodo(filepath) {
		return fs.readFileSync(filepath, "utf-8")
			.trim()
			.split(/\n/);
	}

	function addCount(input, index) {
		index = (input.match(/\[[\s\txX]+\]/)) ? index : '';
	  return lpad(index)+"  "+input;
	}

	function markDone(input) {
	  return input.replace(/\[[\s\t]+\]/, '[X]');
	}

	function markNotDone(input) {
	  return input.replace(/\[X+\]/, '[ ]');
	}

	function lpad(str) {
		str = String(str);
	    while (str.length < 6)
	        str = " " + str;
	    return str;
	}  
	
};

