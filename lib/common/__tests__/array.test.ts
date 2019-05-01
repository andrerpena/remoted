import { naturalJoin } from "../array";

describe("array", () => {
  describe("naturalJoin", () => {
    it("should work with 1 item", () => {
      expect(naturalJoin(["a"])).toEqual("a");
    });
    it("should work with 2 items", () => {
      expect(naturalJoin(["a", "b"])).toEqual("a and b");
    });
    it("should work with 3 items", () => {
      expect(naturalJoin(["a", "b", "c"])).toEqual("a, b and c");
    });
  });
});
