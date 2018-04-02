const sitemap = require("./sitemap/sitemap.service");
module.exports = (app) => {
  app.configure(sitemap);
};
