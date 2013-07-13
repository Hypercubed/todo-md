# Todo list for [todo-md](https://github.com/Hypercubed/todo-md)

_(managed using [todo-md](https://github.com/Hypercubed/todo-md))_

### Options:

- [ ] -i to set input file (default: cwd+todo.md), use - for stdin
- [ ] -o to set ouput file (default: cwd+todo.md), use - for stdin
- [x] -g to set input file to global default (default: npm directory+todo.md)
- [ ] -  to toggle console (stderr) echo

### Commands:

- [x] add <string> to add <string> as a task
- [ ] add <string> <line> to add <string> at line <line>
- [x] cat to list without changes (default is same as cat todo.md)
- [x] nl to list with line numbers (default is same as nl todo.md)
- [x] do <line> to mark task on line <line> as done
- [x] undo <line> to mark task on line <line> as not done
- [x] rm <line> to remove a line
- [ ] replace <string> <line> to replace <line> with <string>
- [ ] move?
- [ ] init

#### Other todos:

- [ ] Add tests using Mocha
- [x] Abstract out markdown editing (do, undo)
- [ ] Indention
- [x] Error if no commands given
- [ ] Works with stdin and stdout
- [x] Works with files
- [ ] Work with temp file
- [ ] Handle extra whitespace in todo mark
- [ ] Work with list of indecies
- [ ] Option to always print with command lines
- [ ] Make indecies 1-based?
- [ ] Move global task list to user directory (~/.taskmd?)
- [ ] Sub lists?
- [ ] Named lists?
- [ ] Option to add "managed using"?
- [ ] Interactive mode?  (like repl it?)
- [ ] Gist support?
- [x] Conform to https://github.com/blog/1375-task-lists-in-gfm-issues-pulls-comments
- [ ] todo.md or task.md?
- [ ] Colorize list
- [ ] Add warning msgs on invalid index
- [ ] Turn off echo
- [ ] Option to only print alterned lines
- [ ] Make todo.js async?
