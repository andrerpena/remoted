import { getIconForTag } from "../tag-icons";

describe("tag-icons", () => {
  describe("getIconForTag", () => {
    it("should work", () => {
      const icon = getIconForTag("java");
      expect(icon.icon).toEqual("java");
    });
  });
});
