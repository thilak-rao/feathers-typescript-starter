(() => {
  const assert = require("assert");
  const rp = require("request-promise");
  const url = require("url");
  const app = require("../src/app");

  const port = app.get("port") || 3030;
  const getUrl = (pathname) => url.format({
    hostname: app.get("host") || "localhost",
    pathname,
    port,
    protocol: "http",
  });

  describe("Feathers application tests", () => {
    before(function(done) {
      this.server = app.listen(port);
      this.server.once("listening", () => done());
    });

    after(function(done) {
      this.server.close(done);
    });

    it("starts and shows the index page", () => {
      return rp(getUrl("")).then((body) =>
        assert.ok(body.indexOf("<html>") !== -1),
      );
    });

    describe("404", () => {
      it("shows a 404 HTML page", () => {
        return rp({
          headers: {
            Accept: "text/html",
          },
          url: getUrl("path/to/nowhere"),
        }).catch((res) => {
          assert.equal(res.statusCode, 404);
          assert.ok(res.error.indexOf("<html>") !== -1);
        });
      });

      it("shows a 404 JSON error without stack trace", () => {
        return rp({
          json: true,
          url: getUrl("path/to/nowhere"),
        }).catch((res) => {
          assert.equal(res.statusCode, 404);
          assert.equal(res.error.code, 404);
          assert.equal(res.error.message, "Page not found");
          assert.equal(res.error.name, "NotFound");
        });
      });
    });
  });
})();
