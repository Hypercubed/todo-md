
module.exports = function (program) {

	// Node.js
	var path            = require('path');
	var fs              = require('fs');

	// Local
	var pkg             = require('../package.json');	

	program.name = 'todo';

	program.option('-g, --global', "use global todo list");

	program.on('--help', function(){
	  console.log('  Bug reports, suggestions, updates:');
	  console.log('  ', pkg.bugs.url);
	});

	program
	   .command('list')
	   .usage('list')
	   .version('0.0.0')
	   .description('Displays all the lines in todo list.')
	   .option('-i, --input [file]')
	   .action(function(opts){

	   		opts = getDefaultOptions(opts);

			var markdown = fs.readFileSync(opts.input, "utf-8");
			console.log(markdown);
	   });

	program
	   .command('nl')
	   .description('Displays all the lines in todo list with line numbers')
	   .option('-i, --input [file]')
	   .action(function(opts){
	   		opts = getDefaultOptions(opts);

			var markdown = fs.readFileSync(opts.input, "utf-8");
			markdown = markdown.split(/\n/).map(addCount).join('\n');

			console.log(markdown);
	   });

	program
	   .command('do <index>')
	   .description('Marks task as done')
	   .option('-i, --input [file]')
	   .option('-o, --output [file]')
	   .action(function(index, opts) {
	   		opts = getDefaultOptions(opts);

			var markdown = fs.readFileSync(opts.input, "utf-8");
			markdown = markdown
				.split(/\n/)
				.map(function(line, i) {
					if (i++ == index)
					  line = markDone(line);

					return line;
				})
				.join('\n');

			if (opts.output)
				fs.writeFile(opts.output, markdown);

			console.log(markdown);

	   });

	program
	   .command('undo <index>')
	   .description('Marks task as not done')
	   .option('-i, --input [file]')
	   .option('-o, --output [file]')
	   .action(function(index, opts) {
	   		opts = getDefaultOptions(opts);

			var markdown = fs.readFileSync(opts.input, "utf-8");
			markdown = markdown
				.split(/\n/)
				.map(function(line, i) {
					if (i++ == index)
					  line = markNotDone(line);

					return line;
				})
				.join('\n');

			if (opts.output)
				fs.writeFile(opts.output, markdown);

			console.log(markdown);
	   });

	program
	   .command('add <text_to_add>')  // TODO: Push to index, to section
	   .description('Adds text_to_add to your todo file on its own line.')
	   .option('-i, --input [file]')
	   .option('-o, --output [file]')
	   .action(function(text, opts) {
	   		opts = getDefaultOptions(opts);

			var markdown = fs.readFileSync(opts.input, "utf-8");
			markdown = markdown.trim().split(/\n/);

			var ws = markdown[markdown.length-1].match(/^[ \t]+/);
			markdown.push(ws+'[ ] '+text+'\n');

			markdown = markdown.join('\n');

			if (opts.output)
				fs.writeFile(opts.output, markdown);

			console.log(markdown);
			
	   });



	program
	   .command('rm <index>')
	   .description('Remove a task')
	   .option('-i, --input [file]')
	   .option('-o, --output [file]')
	   .action(function(index,opts) {
	   		opts = getDefaultOptions(opts);

			var markdown = fs.readFileSync(opts.input, "utf-8").split(/\n/);
			markdown.splice(index,1);

			console.log(markdown.join('\n'));

	   });

	function getDefaultOptions(opts) {
	  opts = opts || {};
	  opts.debug = opts.debug || false;

	  if (!opts.input)
	  	opts.input = (program.global) ? path.join(__dirname, '../todo.md') : path.join(process.cwd(), 'todo.md');

	  if (!opts.output)
	  	opts.output = opts.input;

	  return opts;
	}

	function addCount(input, index) {
	  return input.replace(/\[[\s\t]+\]/, '[  :'+(index)+']').replace(/\[[\s\tX]+\]/, '[X :'+(index)+']');
	}

	function markDone(input) {
	  return input.replace(/\[[\s\t]+\]/, '[X]');
	}

	function markNotDone(input) {
	  return input.replace(/\[X+\]/, '[ ]');
	}	   
	
};

