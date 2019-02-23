import { importSchema } from "graphql-import";
import { ApolloServer, gql } from "apollo-server-express";
import { Request } from "express";
import { Context } from "./context";
import { buildDb } from "../db/build-db";
import { PAGE_SIZE } from "../constants";
import { getJobs } from "./services/job-service";
import { Company, IResolvers } from "../../graphql-types";
import { getCompany } from "./services/company-service";

const typeDefs = gql(importSchema("server/graphql/schema.graphql"));

type Resolvers = IResolvers & {
  [key: string]: any;
};

const resolvers: Resolvers = {
  Query: {
    jobs: async (_parent, args) => {
      const db = await buildDb();
      return getJobs(db, args.limit || PAGE_SIZE, args.offset || 0);
    },
    company: async (_parent, args) => {
      const db = await buildDb();
      return getCompany(db, args.id, args.urlReference);
    }
  },
  Mutation: {
    addCompany: async (_parent, args) => {
      console.log(args);
      return {
        id: "aaa",
        name: "aaa"
      } as Company;
    }
  }
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
