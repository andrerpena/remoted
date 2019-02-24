import { importSchema } from "graphql-import";
import { ApolloServer, gql } from "apollo-server-express";
import { Request } from "express";
import { Context } from "./context";
import { buildDb } from "../db/build-db";
import { PAGE_SIZE } from "../constants";
import { addJob, getJobs } from "./services/job-service";
import { IResolvers } from "../../graphql-types";
import { addCompany, getCompany } from "./services/company-service";

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
      const db = await buildDb();
      return addCompany(db, args.input);
    },
    addJob: async (_parent, args) => {
      const db = await buildDb();
      return addJob(db, args.input);
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
  playground: true,
  context: getContext
});
