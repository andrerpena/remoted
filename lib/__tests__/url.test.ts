import { extractTagFromPath, removeQueryString } from "../url";

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
  describe("extractTagFromPath", () => {
    it("should work when Regex matches", () => {
      const tag = extractTagFromPath("remote-reactjs-jobs");
      expect(tag).toEqual("reactjs");
    });
    it("should work with dashes", () => {
      const tag = extractTagFromPath("remote-amazon-web-service-jobs");
      expect(tag).toEqual("amazon-web-service");
    });
    it("should return null when it does not match", () => {
      const tag = extractTagFromPath("remote2-amazon-web-service-jobs");
      expect(tag).toEqual(null);
    });
  });
});
