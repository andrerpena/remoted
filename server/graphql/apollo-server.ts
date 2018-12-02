import { importSchema } from "graphql-import";
import { ApolloServer, gql } from "apollo-server-express";
import { Resolvers } from "./resolver-types";

const typeDefs = gql(importSchema("server/graphql/schema.graphql"));

type ResolversType = Resolvers & {
  [key: string]: any;
};

const resolvers: ResolversType = {
  Query: {
    hello() {
      return "world";
    }
  },
  Company: {
    name: () => {
      return "this is a company name";
    }
  },
  Mutation: {
    addCompany: () => {
      return {
        name: "something"
      };
    }
  }
};

export const apolloServer = new ApolloServer({ typeDefs, resolvers });
