import { extractLocationTag } from "../location";

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
      const locationTag = extractLocationTag("blablabla", "oh usa only bitte");
      expect(locationTag).toEqual("us-only");
    });
  });
});
