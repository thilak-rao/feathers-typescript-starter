const todo = require("./todo/todo.service");
module.exports = (app) => {
  app.configure(todo);
};
