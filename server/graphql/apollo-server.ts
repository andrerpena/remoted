import { importSchema } from "graphql-import";
import { ApolloServer, gql } from "apollo-server-express";
import { JobResolvers, MutationResolvers, Resolvers } from "./resolver-types";
import { Request } from "express";
import { Context } from "./context";
import { buildDb } from "../db/build-db";
import { PAGE_SIZE } from "../constants";
import { getJobs, insertJob } from "./services/job-service";

const typeDefs = gql(importSchema("server/graphql/schema.graphql"));

type ResolversType = Resolvers & {
  [key: string]: any;
};

const resolvers: ResolversType = {
  Query: {
    jobs: async (_parent, args) => {
      const db = await buildDb();
      return getJobs(db, args.limit || PAGE_SIZE, args.offset || 0);
    }
  },
  Job: JobResolvers.defaultResolvers,
  Mutation: {
    addJob: async (_parent: undefined, args: MutationResolvers.ArgsAddJob) => {
      const db = await buildDb();
      return insertJob(db, args.input);
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
