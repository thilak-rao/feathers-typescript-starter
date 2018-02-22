const todo = require('./todo/todo.service');
module.exports = function (app) {
  app.configure(todo);
};
