# Todo list for [todo-md](https://github.com/Hypercubed/todo-md)

_\( managed using [todo-md](https://github.com/Hypercubed/todo-md) \)_

### Priority
- [ ] Finish -o
- [x] Ranges
  - [x] do
  - [x] undo
  - [x] rm
- [x ] List of indecies
  - [x] do
  - [x] undo
  - [x] rm

### Options:

- [ ] -i to set input file (default: cwd+todo.md), use - for stdin
- [ ] -o to set output file (default: cwd+todo.md), use - for stdin
- [x] -g to set input file to global default
- [ ] -  to toggle console (stderr) echo

### Commands:

- [x] add <string> to add <string> as a task
- [x] add <string> <line> to add <string> at line <line>
- [x] cat to list without changes (default is same as cat todo.md)
- [x] nl to list with line numbers (default is same as nl todo.md)
- [x] do <line> to mark task on line <line> as done
- [x] undo <line> to mark task on line <line> as not done
- [x] rm <line> to remove a line
- [ ] replace <string> <line> to replace <line> with <string>
- [ ] move
- [ ] purge done
- [ ] init
- [ ] append
- [ ] get text from one line, (todo print 15 > anotherfile.txt)

#### Other todos:

- [x] Abstract out markdown editing (do, undo)
- [ ] Indention
- [x] Error if no commands given
- [ ] Works with stdin and stdout
- [x] Works with files
- [ ] Work with temp file
- [ ] Handle extra whitespace in todo mark
- [ ] Work with list of indices
- [ ] Option to always print with command lines
- [ ] Make all indices 1-based?
- [x] Move global task list to user directory (~/.taskmd?)
- [ ] Sub lists?
- [ ] Named lists?
- [ ] Option to add "managed using"?
- [ ] Interactive mode?  (like repl it?)
- [ ] Gist support?
- [x] Conform to https://github.com/blog/1375-task-lists-in-gfm-issues-pulls-comments
- [-] todo.md or task.md?
- [ ] Colorize list
- [ ] Add warning msgs on invalid index
- [ ] Turn off echo
- [ ] Option to only print altered lines
- [ ] Make todo.js async?
- [ ] Check for missing todo.md
- [ ] rm, do, and undo by text?
- [ ] Read todo's from other files, example .js and .md
- [ ] Improve options
- [ ] config
- [x] update autocmdr dependency
- [ ] Add better tests using mocha
- [ ] Handle extra marks (X,x,-,A,B,C, etc)
- [ ] add --no-color option
