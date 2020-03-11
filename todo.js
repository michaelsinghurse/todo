// todo.js

class Todo {
  static DONE_MARKER = '\u2713';  // check-mark
  static UNDONE_MARKER = ' ';

  constructor(title) {
    this.title = title;
    this.done = false;
  }

  getTitle() {
    return this.title;
  }

  isDone() {
    return this.done;
  }

  markDone() {
    this.done = true;
  }

  markUndone() {
    this.done = false;
  }

  toString() {
    let marker = this.isDone() ? Todo.DONE_MARKER : Todo.UNDONE_MARKER;
    return `[${marker}] ${this.getTitle()}`;
  }
}

module.exports = Todo;