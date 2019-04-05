import { isSourceValid } from "../sources";

describe("sources", () => {
  describe("isSourceValid", () => {
    it("should work when source is valid", () => {
      const result = isSourceValid("stackoverflow");
      expect(result).toBe(true);
    });
    it("should work when source is invalid", () => {
      const result = isSourceValid("lucky");
      expect(result).toBe(false);
    });
  });
});
