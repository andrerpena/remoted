import { generateSlug, makeId } from "../id";

describe("id", () => {
  describe("makeId", () => {
    it("should work", () => {
      const x = makeId();
      expect(x.length).toBe(5);
    });
  });
  describe("generateSlug", () => {
    it("should work", () => {
      const slug = generateSlug("HEllo/:_ -andre");
      expect(slug).toEqual("hello_-andre");
    });
  });
});
