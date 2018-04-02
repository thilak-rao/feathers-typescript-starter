const assert = require("assert");
const app = require("../../src/app");

describe("'sitemap' service", () => {
  it("registered the service", () => {
    const sitemap = app.service("sitemap");
    assert.ok(sitemap, "Registered the service");
  });

  it("create new sitemap", () => {
    app.service("sitemap").create({
      sitemap: "using mocha to test sitemap service",
    }).then((data) => {
      assert.equal(data.sitemap === "using mocha to test sitemap service", "new sitemap created");
    });
  });
});
