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
    let todo = this.findByTitle(title)
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

let todo1 = new Todo("Buy milk");
todo1.markDone();
let todo2 = new Todo("Clean room");
let todo3 = new Todo("Go to the gym");
let todo4 = new Todo("Go shopping");
let todo5 = new Todo("Feed the cats");
todo5.markDone();
let todo6 = new Todo("Study for Launch School");

let list = new TodoList("Today's Todos");
list.add(todo1);
list.add(todo2);
list.add(todo3);
list.add(todo4);
list.add(todo5);
list.add(todo6);

list.markDone('Hello');