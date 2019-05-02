import { toTitleCase } from "../tags";

describe("tags", () => {
  describe("toTitleCase", () => {
    it("should work without dashes", () => {
      expect(toTitleCase("blablabla")).toEqual("Blablabla");
    });
    it("should work with 1 dash", () => {
      expect(toTitleCase("react-js")).toEqual("React-Js");
    });
    it("should work with 2 dash", () => {
      expect(toTitleCase("amazon-web-services")).toEqual("Amazon-Web-Services");
    });
  });
});
