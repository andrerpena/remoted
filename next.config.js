require("dotenv").config();
const withTypescript = require("@zeit/next-typescript");
const withSass = require("@zeit/next-sass");
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");

module.exports = withTypescript(
  withSass(
    withBundleAnalyzer({
      analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
      analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
      bundleAnalyzerConfig: {
        server: {
          analyzerMode: "static",
          reportFilename: "../bundles/server.html"
        },
        browser: {
          analyzerMode: "static",
          reportFilename: "../bundles/client.html"
        }
      },
      publicRuntimeConfig: {
        graphqlEndPoint: process.env.GRAPHQL_URI
      }
    })
  )
);
