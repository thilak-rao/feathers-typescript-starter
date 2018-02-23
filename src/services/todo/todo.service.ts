const createService = require('feathers-memory');
const hooks = require('./todo.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const options = { name: 'todo', paginate };

  app.use('/todo', createService(options));

  const service = app.service('todo');

  service.hooks(hooks);
};
