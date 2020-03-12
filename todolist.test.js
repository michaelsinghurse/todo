// todolist.test.js

const Todo = require("./todo");
const TodoList = require("./todolist");

describe("TodoList", () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo("Buy milk");
    todo2 = new Todo("Clean room");
    todo3 = new Todo("Go to the gym");

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  test('toArray() returns the todos in an array', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  test('first() returns the first todo', () => {
    expect(list.first()).toEqual(todo1);
  });

  test('last() returns the last todo', () => {
    expect(list.last()).toEqual(todo3);
  });

  test('shift() removes the first todo from the list and returns it', () => {
    expect(list.shift()).toEqual(todo1);
    expect(list.size()).toBe(2);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });

  test('pop() removes the last todo from the list and returns it', () => {
    expect(list.pop()).toEqual(todo3);
    expect(list.size()).toBe(2);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  test(
    'isDone() returns a boolean indicating whether all todos are done', () => {
   expect(list.isDone()).toBe(false);

   list.markAllDone();
   expect(list.isDone()).toBe(true);
  });

  test('add(todo) adds todo to the list', () => {
    let todo4 = new Todo("Study Launch School");
    list.add(todo4);
    expect(list.toArray()).toEqual([todo1, todo2, todo3, todo4]);
    expect(() => list.add('todo string')).toThrow(TypeError);
  });

  test('itemAt(index) returns the todo at the index passed to it', () => {
    expect(list.itemAt(1)).toEqual(todo2);
    expect(() => list.itemAt(25)).toThrow(ReferenceError);
  });

  test('markDoneAt(index) marks the todo at the index as done', () => {
    list.markDoneAt(0);
    expect(list.itemAt(0).isDone()).toBe(true);
    expect(() => list.markDoneAt(25)).toThrow(ReferenceError);
  });

  test('markUndoneAt(index) marks the todo at the index as undone', () => {
    list.markDoneAt(0);
    expect(list.itemAt(0).isDone()).toBe(true);

    list.markUndoneAt(0);
    expect(list.itemAt(0).isDone()).toBe(false);

    expect(() => list.markUndoneAt(25)).toThrow(ReferenceError);
  });

  test('markAllDone() marks all todos as done', () => {
    list.markAllDone();
    expect(list.isDone()).toBe(true);
  });

  test(
    'removeAt(index) removes the todo at the index from the list ' +
    'and returns it within an array', () => {
      expect(() => list.removeAt(-2)).toThrow(ReferenceError);
      expect(list.removeAt(2)).toEqual([todo3]);
      expect(list.toArray()).toEqual([todo1, todo2]);
  });

  test('toString() returns a string representation of the list', () => {
    let testString = "---- Today's Todos ----" +
    "\n[ ] Buy milk" +
    "\n[ ] Clean room" +
    "\n[ ] Go to the gym";

    expect(list.toString()).toBe(testString);
  });

  test('toString() returns a string with some of the todos marked done', () => {
    list.markDoneAt(0);
    let doneMarker = Todo.DONE_MARKER;

    let testString = "---- Today's Todos ----" +
    `\n[${doneMarker}] Buy milk` +
    "\n[ ] Clean room" +
    "\n[ ] Go to the gym";

    expect(list.toString()).toBe(testString);
  });

  test('toString() returns a string with all of the todos marked done', () => {
    list.markAllDone();
    let doneMarker = Todo.DONE_MARKER;

    let testString = "---- Today's Todos ----" +
    `\n[${doneMarker}] Buy milk` +
    `\n[${doneMarker}] Clean room` +
    `\n[${doneMarker}] Go to the gym`;

    expect(list.toString()).toBe(testString);
  });

  test('forEach() iterates over each todo in the list', () => {
    let titles = [ todo1.getTitle(), todo2.getTitle(), todo3.getTitle() ];
    let arr = [];
    list.forEach(todo => arr.push(todo.getTitle()));
    expect(arr).toEqual(titles);
  });

  test('filter() returns a new TodoList', () => {
    let testList = new TodoList(list.title);
    testList.add(todo1);

    expect(list.filter(todo => todo.getTitle() === todo1.title))
      .toEqual(testList);
  });
  
  test('allDone() returns a TodoList with all the done todos', () => {
    let testList = new TodoList(list.title);
    testList.add(todo1);
    testList.add(todo2);
    
    list.markDoneAt(0);
    list.markDoneAt(1);
    
    expect(list.allDone()).toEqual(testList);
  });
  
  test('allNotDone() returns a TodoList with all the not done todos', () => {
    let testList = new TodoList(list.title);
    testList.add(todo1);
    testList.add(todo2);
    testList.add(todo3);
    
    expect(list.allNotDone()).toEqual(testList);
  });
  
  test('findByTitle(title) returns the todo with the given title', () => {
    expect(list.findByTitle(todo1.getTitle())).toEqual(todo1);
    expect(list.findByTitle("s0ome tit1e")).not.toBeTruthy();
  });
  
  test('markAllUndone() marks every todo as undone', () => {
    list.markDoneAt(0);
    list.markDoneAt(1);
    list.markDoneAt(2);
    
    list.markAllUndone();
    
    expect(list.allNotDone().toArray()).toEqual([todo1, todo2, todo3]);
  });
  
  test('markDone(title) marks the todo with the given title as done', () => {
    list.markDone(todo3.title);
    
    expect(list.allDone().toArray()).toEqual([todo3]);
  });
});














