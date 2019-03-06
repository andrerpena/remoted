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
      const companyImageUrl = buildCompanyImageUrl("something.png");
      expect([
        "https://remoted.sfo2.digitaloceanspaces.com/dev/remoted/companies/something.png",
        "https://remoted.sfo2.digitaloceanspaces.com/prod/remoted/companies/something.png"
      ]).toContain(companyImageUrl);
    });
  });
});
