import { config } from "dotenv";

config();
import { generateCompanyPublicId } from "../company-service";

describe("company-service", () => {
  describe("generateCompanyPublicId", () => {
    it("should work", () => {
      const companyPublicId = generateCompanyPublicId("Awesome Company");
      expect(companyPublicId.substr(6)).toEqual("awesome-company");
    });
  });
});
