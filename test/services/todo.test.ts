const assert = require('assert');
const app = require('../../src/app');

describe('\'todo\' service', () => {
  it('registered the service', () => {
    const todo = app.service('todo');
    assert.ok(todo, 'Registered the service');
  });

  it('create new todo', () => {
    app.service('todo').create({
      "todo": "using mocha to test todo service"
    }).then((data) => {
      assert.equal(data.todo == "using mocha to test todo service", "new todo created");
    });
  });
});
