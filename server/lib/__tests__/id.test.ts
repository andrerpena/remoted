import { makeId } from "../id";

describe("id", () => {
  describe("makeId", () => {
    it("should work", () => {
      const x = makeId();
      expect(x.length).toBe(5);
    });
  });
});
