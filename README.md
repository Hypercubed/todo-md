todo-md [![Build Status](https://secure.travis-ci.org/Hypercubed/todo-md.png?branch=master)](https://travis-ci.org/Hypercubed/todo-md) [![NPM version](https://badge.fury.io/js/todo-md.png)](http://badge.fury.io/js/todo-md)
======

# Description

Manage your [GitHub Flavored Markdown Task List](https://github.com/blog/1375-task-lists-in-gfm-issues-pulls-comments) from the command line.  A simple (but useful?) example built using [autocmdr](https://github.com/Hypercubed/autocmdr).


# Introduction

Todo-md is meant to be a dead simple text based task manager.  There are many task managers out there.  What makes todo-md different?  todo-md is, first of all, markdown based.  todo-md runs off the command line and the task list is stored in a simple markdown file.  Text based tasks list are easy to manage as part of a git repository.  Simply check-in your todo.md file along with your source code and readme file.  Also, like git and npm, todo-md by default works in the current working directory so each project can have it's own todo list.

I use todo-md all the time.  I hope you find it useful as well.  Feedback is welcome.

# Installation

Install todo-md globally

    $ npm install -g Hypercubed/todo-md

# Quick start

Creating a todo list is done simply by adding your first task.  For example 

    $ todo "Learn to use task-md"

will create a `todo.md` file in the current directory containing a single line:

```
   - [ ] Learn to use task-md
```

Note that when adding tasks the `add` command is optional.  You can also type `todo add "Learn to use task-md"`.

To mark a task as done type

    $ todo do 1

or undo

    $ todo undo 1

To remove a task

    $ todo rm 1

After each command you will see a list of your tasks along with line numbers.  You can also get the list at anytime by typing

    $ todo

Note that the command `list` is optional you may also type `todo list`.

Note that `do`, `undo`, and `rm` require an index while `list` and `add` the index is optional.  With the exception of the `add` command this index can be a single line number (as displayed when running `todo list`) or a list of line numbers.  Ranges may also be used.  For example the following command will mark line 15,20, and 25-30 as done.

    $ todo do 15,20,25-30

## Usage

  Usage: todo [options] [command]

  Commands:

                 list [index]  Displays all (or specified) lines in todo list with line numbers
                print [index]  Displays all (or specified) lines in todo list without line numbers (same as list --no-color --no-stats --no-line-numbers)
    add <text_to_add> [index]  Adds text_to_add to your todo file on its own line at [index] or EOF if no index provided    
                   do <index>  Marks task as done
                 undo <index>  Marks task as not done
                   rm <index>  Removes tasks

  Options:

    -h, --help    output usage information
    -d, --debug   enable debugger
    -g, --global  use global todo list (usually ~/todo.md)
    -N, --no-line-numbers  Disable line numbers

## Autocomplete

Do one of the following to enable auto-completion in your shell.

* Add completion helper to ~/.bashrc (or ~/.zshrc) `todo completion >> ~/.bashrc`
* Add completion to current shell `. <(todo completion)`

# Todo

See todo.md (managed using [todo-md](https://github.com/Hypercubed/todo-md))

# License

Copyright (c) 2013 Jayson Harshbarger
[MIT License](http://en.wikipedia.org/wiki/MIT_License)

# Acknowledgments

Built using [generator-commader](https://github.com/Hypercubed/generator-commander) and [autocmdr](https://github.com/Hypercubed/autocmdr).
