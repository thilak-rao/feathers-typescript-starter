const assert = require('assert');
const app = require('../../src/app');

describe('\'todo\' service', () => {
  it('registered the service', () => {
    const todo = app.service('todo');
    assert.ok(todo, 'Registered the service');
  });

  // it('create new todo', () => {
  //   const newTodo = app.service('todo').create({
  //     "todo": "using mocha to test todo service"
  //   });
  //   assert.equal(newTodo.todo === "using mocha to test todo service", "new todo created");
  // });
});
