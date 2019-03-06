import { config } from "dotenv";

config();
import {
  buildCompanyImageUrl,
  generateCompanyPublicId
} from "../company-service";

describe("company-service", () => {
  describe("generateCompanyPublicId", () => {
    it("should work", () => {
      const companyPublicId = generateCompanyPublicId("Awesome Company");
      expect(companyPublicId.substr(6)).toEqual("awesome-company");
    });
  });
  describe("buildCompanyImageUrl", () => {
    it("should work", () => {
      const companyPublicId = buildCompanyImageUrl("something.png");
      expect(companyPublicId).toEqual(
        "https://remoted.sfo2.digitaloceanspaces.com/dev/remoted/companies/something.png"
      );
    });
  });
});
