
Options:
	[ ] -i to set input file (default: cwd+todo.md), use - for stdin
	[ ] -o to set ouput file (default: cwd+todo.md), use - for stdin
	[X] -g to set input file to global default (default: npm directory+todo.md)
	[ ] -  to toggle console (stderr) echo

Commands:
	[X] add <string> to add <string> as a task
	[ ] add <string> <line> to add <string> at line <line>
	[X] cat to list without changes (default is same as cat todo.md)
	[X] nl to list with line numbers (default is same as nl todo.md)
	[X] do <line> to mark task on line <line> as done
	[X] undo <line> to mark task on line <line> as not done
	[X] rm <line> to remove a line
	[ ] replace <string> <line> to replace <line> with <string>

Other todos:
	[ ] Add tests using Mocha
	[ ] Abstract out markdown editing (do, undo)
	[ ] Indention
	[ ] Error if no commands given
	[ ] Works with stdin and stdout
	[ ] Works with files
	[ ] Work with temp file
	[ ] Handle extra whitespace in todo mark
	[ ] Work with list of indecies
