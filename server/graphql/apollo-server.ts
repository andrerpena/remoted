import { importSchema } from "graphql-import";
import { ApolloServer, gql } from "apollo-server-express";

const typeDefs = gql(importSchema("server/graphql/schema.graphql"));

const resolvers = {
  Query: {
    hello() {
      return "world";
    }
  }
};

export const apolloServer = new ApolloServer({ typeDefs, resolvers });
