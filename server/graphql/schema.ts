import { importSchema } from "graphql-import";
import { makeExecutableSchema } from "graphql-tools";

// Construct a schema, using GraphQL schema language
// const schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);

const typeDefs = importSchema("server/graphql/schema.graphql");

// The root provides a resolver function for each API endpoint
const resolvers = {
  Query: {
    hello() {
      return "world";
    }
  }
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });
