import { getTimeDifferenceInDays, timeAgo } from "../time";

describe("time", () => {
  describe("timeAgo", () => {
    it("1 hour should be 1 hour", () => {
      const now = new Date(2019, 1, 1, 10, 0, 0);
      const then = new Date(2019, 1, 1, 9, 0, 0);
      const result = timeAgo(then, now);
      expect(result).toEqual("1h");
    });
    it("1 hour and a half should display 1 hour", () => {
      const now = new Date(2019, 1, 1, 10, 0, 0);
      const then = new Date(2019, 1, 1, 8, 30, 0);
      const result = timeAgo(then, now);
      expect(result).toEqual("1h");
    });
    it("30 hours should be 1 day", () => {
      const now = new Date(2019, 1, 1, 10, 0, 0);
      const then = new Date(now.getTime());
      then.setHours(then.getHours() - 30);
      const result = timeAgo(then, now);
      expect(result).toEqual("1d");
    });
  });
  describe("getTimeDifferenceInDays", () => {
    it("should work when difference smaller than 1 day", () => {
      const now = new Date(2019, 1, 1, 10, 0, 0);
      const then = new Date(2019, 1, 1, 9, 0, 0);
      const difference = getTimeDifferenceInDays(now, then);
      expect(difference).toEqual(0.041666666666666664);
    });
    it("should work when difference is 1 day", () => {
      const now = new Date(2019, 1, 2, 10, 0, 0);
      const then = new Date(2019, 1, 1, 10, 0, 0);
      const difference = getTimeDifferenceInDays(now, then);
      expect(difference).toEqual(1);
    });
    it("should work when difference is bigger than 1 day", () => {
      const now = new Date(2019, 1, 3, 10, 0, 0);
      const then = new Date(2019, 1, 1, 10, 0, 0);
      const difference = getTimeDifferenceInDays(now, then);
      expect(difference).toEqual(2);
    });
  });
});
