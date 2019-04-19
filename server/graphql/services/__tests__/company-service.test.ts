import { config } from "dotenv";

config();
import {
  buildCompanyCdnImageUrl,
  generateCompanyPublicId
} from "../company-service";

describe("company-service", () => {
  describe("generateCompanyPublicId", () => {
    it("should work", () => {
      const companyPublicId = generateCompanyPublicId("Awesome Company");
      expect(companyPublicId.substr(6)).toEqual("awesome-company");
    });
  });
  describe("buildCompanyCdnImageUrl", () => {
    it("should work", () => {
      const companyImageUrl = buildCompanyCdnImageUrl("something.png");
      expect([
        "https://remoted.sfo2.cdn.digitaloceanspaces.com/dev/remoted/companies/something.png",
        "https://remoted.sfo2.cdn.digitaloceanspaces.com/prod/remoted/companies/something.png"
      ]).toContain(companyImageUrl);
    });
  });
});
