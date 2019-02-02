import { importSchema } from "graphql-import";
import { ApolloServer, gql } from "apollo-server-express";
import { JobResolvers, Resolvers } from "./types/resolver-types";
import { Request } from "express";
import { Context } from "./types/context";

const typeDefs = gql(importSchema("server/graphql/schema.graphql"));

type ResolversType = Resolvers & {
  [key: string]: any;
};

const resolvers: ResolversType = {
  Query: {
    jobs: () => {
      return [
        {
          id: "abc",
          title: "hey hey mom"
        }
      ];
    }
  },
  Job: JobResolvers.defaultResolvers
};

// @ts-ignore
export function getContext({ req }: { req: Request }) {
  const context: Context = {
    authScope: {
      name: "andre"
    }
  };
  return context;
}

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: getContext
});
