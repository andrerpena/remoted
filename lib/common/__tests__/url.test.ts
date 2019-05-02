import {
  buildQuery,
  buildQueryIntoPath,
  extractIndexQueryFromPath,
  linkToTagCanonical,
  removeQueryString
} from "../url";

describe("url", () => {
  describe("buildQuery", () => {
    it("should work with no parameters", () => {
      expect(buildQuery({})).toEqual("");
    });
    it("should work with one number parameter", () => {
      expect(buildQuery({ a: 2 })).toEqual("a=2");
    });
    it("should work with true", () => {
      expect(buildQuery({ a: true })).toEqual("a=true");
    });
    it("should work with false", () => {
      expect(buildQuery({ a: false })).toEqual("a=false");
    });
    it("should work with multiple parameters", () => {
      expect(buildQuery({ a: false, b: 2, n: "andre" })).toEqual(
        "a=false&b=2&n=andre"
      );
    });
  });
  describe("buildQueryIntoPath", () => {
    it("should work when there is nothing", () => {
      expect(buildQueryIntoPath({})).toEqual("");
    });
    it("should work with one number parameter", () => {
      expect(buildQueryIntoPath({ a: 2 })).toEqual("-a");
    });
    it("should work with multiple parameters", () => {
      expect(buildQueryIntoPath({ n: "andre", a: false, b: 2 })).toEqual(
        "-a-b-n"
      );
    });
  });
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
      const tag = extractIndexQueryFromPath("remote-reactjs-jobs");
      expect(tag).toEqual({
        tag: "reactjs"
      });
    });
    it("should work with dashes", () => {
      const tag = extractIndexQueryFromPath("remote-amazon-web-service-jobs");
      expect(tag).toEqual({
        tag: "amazon-web-service"
      });
    });
    it("should return null when it does not match", () => {
      const tag = extractIndexQueryFromPath("remote2-amazon-web-service-jobs");
      expect(tag).toEqual(null);
    });
    it("should work with additional parameters", () => {
      const tag = extractIndexQueryFromPath(
        "remote-amazon-web-service-jobs-anywhere-salary"
      );
      expect(tag).toEqual({
        anywhere: "true",
        salary: "true",
        tag: "amazon-web-service"
      });
    });
  });
  describe("linkToTagCanonical", () => {
    it("should work when there is no tag and one parameter", () => {
      expect(linkToTagCanonical({ noeuropeonly: true })).toEqual(
        "/?noeuropeonly=true"
      );
    });
    it("should work when there is no tag and multiple parameters", () => {
      expect(linkToTagCanonical({ noeuropeonly: true, salary: true })).toEqual(
        "/?noeuropeonly=true&salary=true"
      );
    });
    it("should eliminate falsy props", () => {
      expect(linkToTagCanonical({ noeuropeonly: true, salary: false })).toEqual(
        "/?noeuropeonly=true"
      );
    });
    it("should work with query and no other filter", () => {
      expect(linkToTagCanonical({ tag: "reactjs" })).toEqual(
        "/remote-reactjs-jobs"
      );
    });
    it("should work with query and other parameters", () => {
      expect(linkToTagCanonical({ tag: "reactjs", salary: true })).toEqual(
        "/remote-reactjs-jobs-salary"
      );
    });
  });
});
