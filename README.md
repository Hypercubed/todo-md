todo-md [![Build Status](https://secure.travis-ci.org/Hypercubed/todo-md.png?branch=master)](https://travis-ci.org/Hypercubed/todo-md) [![NPM version](https://badge.fury.io/js/todo-md.png)](http://badge.fury.io/js/todo-md)
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

## Do one of the following to enable auto-completion in your shell.

* Add completion helper to ~/.bashrc (or ~/.zshrc) `todo completion >> ~/.bashrc`
* Add completion to current shell `. <(todo completion)`

# Todo

See todo.md (managed using [todo-md](https://github.com/Hypercubed/todo-md))

# License

Copyright (c) 2013 Jayson Harshbarger
[MIT License](http://en.wikipedia.org/wiki/MIT_License)

# Acknowledgments

Built using [generator-commader](https://github.com/Hypercubed/generator-commander) and [autocmdr](https://github.com/Hypercubed/autocmdr).
