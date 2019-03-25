require("dotenv").config();
const withTypescript = require("@zeit/next-typescript");
const withSass = require("@zeit/next-sass");

module.exports = withTypescript(
  withSass({
    publicRuntimeConfig: {
      graphqlEndPoint: process.env.GRAPHQL_URI
    }
  })
);
