const Service = require('feathers-memory');
const hooks = require('./todo.hooks');

class ToDoService extends Service {}

module.exports = function (app) {
  const paginate = app.get('paginate');
  const options = { name: 'todo', paginate };

  app.use('/todo', new ToDoService(options));

  const service = app.service('todo');

  service.hooks(hooks);
};
