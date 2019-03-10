import { removeQueryString } from "../url";

describe("url", () => {
  describe("removeQueryString", () => {
    it("should work when there is no query string", () => {
      const url = removeQueryString(
        "https://stackoverflow.com/questions/2540969/remove-querystring-from-url"
      );
      expect(url).toEqual(
        "https://stackoverflow.com/questions/2540969/remove-querystring-from-url"
      );
    });
    it("should work when there is a query string", () => {
      const url = removeQueryString(
        "https://stackoverflow.com/jobs?med=site-ui&ref=jobs-tab"
      );
      expect(url).toEqual("https://stackoverflow.com/jobs");
    });
    it("should work when there is no URL", () => {
      const url = removeQueryString("");
      expect(url).toEqual("");
    });
  });
});
