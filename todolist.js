// todolist.js

const Todo = require("./todo");

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
  
  allDone() {
    return this.filter(todo => todo.isDone());
  }
  
  allNotDone() {
    return this.filter(todo => !todo.isDone());
  }
  
  filter(callback) {
    let newList = new TodoList(this.getTitle());
    
    this.forEach(todo => {
      if (callback(todo)) {
        newList.add(todo);
      }
    });
    
    return newList;
  }
  
  findByTitle(title) {
    return this.filter(todo => todo.getTitle() === title).first();
  }

  first() {
    return this.todos[0];
  }
  
  forEach(callback) {
    return this.todos.forEach(callback);
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

  markAllDone() {
    this.forEach(todo => todo.markDone());  
  }

  markAllUndone() {
    this.forEach(todo => todo.markUndone());
  }

  markDone(title) {
    let todo = this.findByTitle(title);
    if (todo) {
      todo.markDone();
    }
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

  toArray() {
    return this.todos.slice();    
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

module.exports = TodoList;