import { generateJobPublicId } from "../job-service";

describe("generateJobPublicId", () => {
  it("should work", () => {
    const jobPublicId = generateJobPublicId(
      "This is an awesome job",
      "Awesome Company"
    );
    expect(jobPublicId.substr(6)).toEqual(
      "remote-this-is-an-awesome-job-awesome-company"
    );
  });
  it("should remote duplicate spaces", () => {
    const jobPublicId = generateJobPublicId(
      "This    is    an awesome job",
      "Awesome Company"
    );
    expect(jobPublicId.substr(6)).toEqual(
      "remote-this-is-an-awesome-job-awesome-company"
    );
  });
  it("should not insert 2 jobs with the same URL", () => {
    const jobPublicId = generateJobPublicId(
      "This    is    an awesome job",
      "Awesome Company"
    );
    expect(jobPublicId.substr(6)).toEqual(
      "remote-this-is-an-awesome-job-awesome-company"
    );
  });
});
