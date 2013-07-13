todo-md
======

This is a(nother) work in progress, experiment, proof of concept, and/or waist of time.

# Description

Manage your [GitHub Flavored Markdown Task List](https://github.com/blog/1375-task-lists-in-gfm-issues-pulls-comments) from the command line.  A simple (but useful?) example built using [autocmdr](https://github.com/Hypercubed/autocmdr).

# Usage

# Install todo-md globally


	npm install -g Hypercubed/todo-md


# Usage

	Usage: todo [options] [command]

	Commands:

    list [options]           		Displays all the lines in todo list with line numbers
    do [options] <index>   		Marks task as done
    undo [options] <index> 		Marks task as not done
    add [options] <text_to_add> 	Adds text_to_add to your todo file on its own line.
    rm [options] <index>   		Remove a task

	Options:

    -h, --help    output usage information
    -d, --debug   enable debugger
    -g, --global  use global todo list

# Todo

See todo.md (managed using [todo-md](https://github.com/Hypercubed/todo-md))

# License

  MIT

# Acknowledgments

todo-md was built using [autocmdr](https://github.com/Hypercubed/autocmdr).

