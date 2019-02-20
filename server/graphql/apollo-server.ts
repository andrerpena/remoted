import { importSchema } from "graphql-import";
import { ApolloServer, gql } from "apollo-server-express";
import {
  JobResolvers,
  LocationDetailsResolvers,
  MutationResolvers,
  Resolvers,
  SalaryDetailsResolvers
} from "./resolver-types";
import { Request } from "express";
import { Context } from "./context";
import { buildDb } from "../db/build-db";
import { PAGE_SIZE } from "../constants";
import { GraphQLResolveInfo } from "graphql";
import { DbJobInput } from "../db/model/job";
import { getJobs } from "./services/job-service";

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
  LocationDetails: LocationDetailsResolvers.defaultResolvers,
  SalaryDetails: SalaryDetailsResolvers.defaultResolvers,
  Mutation: {
    addJob: async (
      parent: undefined,
      args: MutationResolvers.ArgsAddJob,
      ctx: Context,
      info: GraphQLResolveInfo
    ) => {
      const job: DbJobInput = {
        title: args.input.title
      };
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
