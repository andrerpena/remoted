import { combine, extractLocationTag, merge } from "../location";

describe("location", () => {
  describe("extractLocationTag", () => {
    it("should not have the tag when there is no location tag", () => {
      const locationTag = extractLocationTag("brazil only please", "blablabla");
      expect(locationTag).toEqual(null);
    });
    it("should get us-only tags from title", () => {
      const locationTag = extractLocationTag("us only please", "blablabla");
      expect(locationTag).toEqual("us-only");
    });
    it("should get us-only tags from description", () => {
      const locationTag = extractLocationTag(
        "blablabla",
        "This position can be remote, but US based candidates only"
      );
      expect(locationTag).toEqual("us-only");
    });
  });
  describe("combine", () => {
    it("should work with 2", () => {
      expect(combine(["a"], ["a", "b"])).toEqual(["a a", "a b"]);
    });
    it("should work with 3", () => {
      expect(combine(["a"], ["and", "&"], ["b"])).toEqual(["a and b", "a & b"]);
    });
  });
  describe("merge", () => {
    it("should work", () => {
      expect(merge(["a"], ["a", "b"])).toEqual(["a", "b"]);
    });
  });
});
