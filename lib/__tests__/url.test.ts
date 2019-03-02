import { normalizeUrl } from "../url";

describe("url", () => {
  describe("normalizeUrl", () => {
    it("should just null when string is not valid", () => {
      expect(() => normalizeUrl("banana")).toThrow();
    });
    it("should work", () => {
      const x = normalizeUrl(
        "https://stackoverflow.com/jobs/243210/open-source-engineer-falco-sysdig?a=1jz2mYJONKs8&so=p&pg=1&offset=-1&total=349&r=true"
      );
      expect(x).toEqual(
        "stackoverflow.com/jobs/243210/open-source-engineer-falco-sysdig"
      );
    });
    it("should work without method", () => {
      expect(() =>
        normalizeUrl(
          "stackoverflow.com/jobs/243210/open-source-engineer-falco-sysdig?a=1jz2mYJONKs8&so=p&pg=1&offset=-1&total=349&r=true"
        )
      ).toThrow();
    });
  });
});
