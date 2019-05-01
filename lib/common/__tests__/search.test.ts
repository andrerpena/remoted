import { getSearchTagLineFor } from "../search";

describe("search", () => {
  describe("getSearchTagLineFor", () => {
    it("should work with empty query", () => {
      expect(getSearchTagLineFor({})).toEqual("All remote jobs");
    });
    it("should work with anywhere", () => {
      expect(getSearchTagLineFor({ anywhere: true })).toEqual(
        "All remote jobs you can work anywhere"
      );
    });
    it("should work with salary", () => {
      expect(getSearchTagLineFor({ salary: true })).toEqual(
        "All remote jobs with salary details"
      );
    });
    it("should work with anywhere and salary", () => {
      expect(getSearchTagLineFor({ anywhere: true, salary: true })).toEqual(
        "All remote jobs you can work anywhere and with salary details"
      );
    });
    it("should work with 1 source", () => {
      expect(getSearchTagLineFor({ stackoverflow: true })).toEqual(
        "All remote jobs from StackOverflow"
      );
    });
    it("should work with 2 sources", () => {
      expect(
        getSearchTagLineFor({ stackoverflow: true, weworkremotely: true })
      ).toEqual(
        "All remote jobs from sources: StackOverflow and WeWorkRemotely"
      );
    });
    it("should work with anywhere, salary and a source", () => {
      expect(
        getSearchTagLineFor({
          anywhere: true,
          salary: true,
          stackoverflow: true
        })
      ).toEqual(
        "All remote jobs you can work anywhere, with salary details and from StackOverflow"
      );
    });
    it("should work with salary and 2 sources", () => {
      expect(
        getSearchTagLineFor({
          salary: true,
          stackoverflow: true,
          weworkremotely: true
        })
      ).toEqual(
        "All remote jobs with salary details and from sources: StackOverflow and WeWorkRemotely"
      );
    });
    it("should work with anywhere, salary and 2 sources", () => {
      expect(
        getSearchTagLineFor({
          anywhere: true,
          salary: true,
          stackoverflow: true,
          weworkremotely: true
        })
      ).toEqual(
        "All remote jobs you can work anywhere, with salary details and from sources: StackOverflow and WeWorkRemotely"
      );
    });
  });
});
