#!/usr/bin/env node

// Node.js
var path            = require('path');
var fs              = require('fs');

// NPM
var program         = require('commander');
var Lazy            = require('lazy');
var byline          = require('byline');

// Loacl
var pkg             = require('../package.json');
var todo            = require('../lib/todo.js');

program
    .version(pkg.version)
    .usage('<command>')
    // turn off repl cmd capture
    .option('-d, --debug', "enable debugger", false)
    //.option('-g, --global', "use global todo list")
    //.option('-f, --file', "specify file to use")
  ;
  
program.name = 'todo';

program.on('--help', function(){
  //console.log('  Example:');
  //console.log('');
  //console.log('    $ '+program.name+' git');
 // console.log('');
  console.log('  Bug reports, suggestions, updates:');
  console.log('  ', pkg.bugs.url);
});

program
   .command('ls')
   .description('Displays all the lines in todo list.')
   .action(function(){
      var options = getDefaultOptions();
      var todofile = byline(fs.createReadStream(options.inputfile));

      var i = 1;

      todofile.on('data', function(line) {
        console.log(line);
      });
   });

program
   .command('nl')
   .description('Displays all the lines in todo list with line numbers')
   .action(function(){
      var options = getDefaultOptions();
      var todofile = byline(fs.createReadStream(options.inputfile));

      var i = 1;

      todofile.on('data', function(line) {
        console.log(addCount(line, i++));
      });
   });

program
   .command('add <text_to_add>')
   .description('Adds text_to_add to your todo file on its own line.')
   .action(function(text) {
      var options = getDefaultOptions();
      var todofile = fs.createWriteStream(options.inputfile, {'flags': 'a'});
      todofile.write('[ ] '+text+'\n');
   });

program
   .command('do <index>')
   .description('Marks task as done')
   .action(function(index) {
      var options = getDefaultOptions();
      var todofile = byline(fs.createReadStream(options.inputfile));

      var i = 1;

      todofile.on('data', function(line) {
        if (i++ == index)
          line = markDone(line);

        console.log(line);
      });

   });

program
   .command('undo <index>')
   .description('Marks task as not done')
   .action(function(index) {
      var options = getDefaultOptions();
      var todofile = byline(fs.createReadStream(options.inputfile));

      var i = 1;

      todofile.on('data', function(line) {
        if (i++ == index)
          line = markNotDone(line);

        console.log(line);
      });
   });

program
   .command('rm <index>')
   .description('Remove a task')
   .action(function(index) {
      var options = getDefaultOptions();
      var todofile = byline(fs.createReadStream(options.inputfile));

      var i = 1;

      todofile.on('data', function(line) {
        if (i++ != index)
          console.log(line);

      });

   });

program.parse(process.argv);

function getDefaultOptions() {
  var options = {};
  options.debug = program.debug || false;
  options.cwd = process.cwd();
  options.inputfile = path.join(options.cwd, 'todo.md');
  options.outputfile = path.join(options.cwd, 'todo.md');
  options.tempfile = options.outputfile+'.bak';
  options.output = process.stdout;

  return options;
}

function addCount(input, index) {
  return input.replace(/\[[\s\t]+\]/, '['+(index)+']');
}

function markDone(input) {
  return input.replace(/\[[\s\t]+\]/, '[X]');
}

function markNotDone(input) {
  return input.replace(/\[X+\]/, '[ ]');
}


