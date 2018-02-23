(() => {
  // Application hooks that run for every service
  const logger = require("./hooks/logger");

  module.exports = {
    before: {
      all: [ logger() ],
      create: [],
      find: [],
      get: [],
      patch: [],
      remove: [],
      update: [],
    },

    after: {
      all: [ logger() ],
      create: [],
      find: [],
      get: [],
      patch: [],
      remove: [],
      update: [],
    },

    error: {
      all: [ logger() ],
      create: [],
      find: [],
      get: [],
      patch: [],
      remove: [],
      update: [],
    },
  };
})();
