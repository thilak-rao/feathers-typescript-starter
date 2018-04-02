const hooks = require("./sitemap.hooks");
const isURL = require("is-url");
const URL = require("url-parse");
const Sitemapper = require("sitemapper");

module.exports = (app) => {
  const sitemapService = {
    create(data) {
      return new Promise((resolve, reject) => {
        if (!isURL(data.url)) {
          reject("Invalid URL");
        }
        const sitemapURL = new URL(data.url);
        const sitemap = new Sitemapper({
          timeout: 5000,
          url: `${sitemapURL.href}/sitemap.xml`,
        });

        sitemap.fetch().then(({ url, sites }) => {
          resolve({
            sites,
            url,
          });
        }).catch((error) => reject(error));
      });
    },
  };

  app.use("/sitemap", sitemapService);

  const service = app.service("sitemap");

  service.hooks(hooks);
};
