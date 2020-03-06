// todolist.js

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

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  add(todo) {
    if (!(todo instanceof Todo)) {
      throw new TypeError("can only add Todo objects");
    }
    this.todos.push(todo);
  }

  first() {
    return this.todos[0];
  }

  getTitle() {
    return this.title;
  }

  isDone() {
    return this.todos.every(todo => todo.isDone());
  }

  itemAt(index) {
    this._validateIndex(index);
    return this.todos[index];
  }

  last() {
    return this.todos[this.size() - 1];
  }

  markDoneAt(index) {
    this.itemAt(index).markDone();
  }

  markUndoneAt(index) {
    this.itemAt(index).markUndone();
  }

  pop() {
    return this.todos.pop();
  }

  removeAt(index) {
    this._validateIndex(index);
    return this.todos.splice(index, 1);
  }

  shift() {
    return this.todos.shift();
  }

  size() {
    return this.todos.length;
  }

  toString() {
    let header = `---- ${this.getTitle()} ----`;

    return this.todos.reduce((string, todo) => {
      string += '\n' + todo.toString();
      return string;
    }, header);
  }

  _validateIndex(index) {
    if (!(index in this.todos)) {
      throw new ReferenceError(`invalid index: ${index}`);
    }
  }
}

