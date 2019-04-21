import { importSchema } from "graphql-import";
import { ApolloServer, gql } from "apollo-server-express";
import { Request } from "express";
import { RemotedContext } from "./remotedContext";
import { buildDb } from "../db/build-db";
import { PAGE_SIZE } from "../../lib/common/constants";
import { addJob, getJob, getJobs } from "./services/job-service";
import { IResolvers } from "../../graphql-types";
import { config } from "dotenv";
import {
  addCompany,
  getCompanyByDisplayName,
  getCompanyByJobPublicId
} from "./services/company-service";
import { getTagCountGroups, getTags } from "./services/tag-service";
import { RemotedDatabase } from "../db/model";

config();

const typeDefs = gql(importSchema("server/graphql/schema.graphql"));

async function applyMutation<R>(
  context: RemotedContext,
  resolver: (db: RemotedDatabase) => Promise<R>
): Promise<R> {
  const token = process.env.GRAPHQL_AUTH_TOKEN;
  if (!token) {
    throw new Error("Cannot read GRAPHQL_AUTH_TOKEN from process.env");
  }
  if (token !== context.authorizationHeader) {
    throw new Error("UNAUTHORIZED");
  }
  const db = await buildDb();
  return resolver(db);
}

type Resolvers = IResolvers<RemotedContext> & {
  [key: string]: any;
};

const resolvers: Resolvers = {
  Query: {
    getJobs: async (_parent, args) => {
      const db = await buildDb();
      return getJobs(
        db,
        args.limit || PAGE_SIZE,
        args.offset || 0,
        args.tag,
        args.anywhere,
        args.excludeLocationTags,
        args.salary,
        args.sources
      );
    },
    getTags: async (_parent, args) => {
      const db = await buildDb();
      return getTags(db, args.text || "");
    },
    getCompany: async (_parent, args) => {
      const db = await buildDb();
      return getCompanyByDisplayName(db, args.displayName);
    },
    getJob: async (_parent, args) => {
      const db = await buildDb();
      return getJob(db, args.id, args.url);
    },
    getTagCountGroups: async (_parent, args) => {
      const db = await buildDb();
      return getTagCountGroups(db, args.tagGroups);
    }
  },
  Mutation: {
    addCompany: async (_parent, args, context) => {
      return applyMutation(context, async db => addCompany(db, args.input));
    },
    addJob: async (_parent, args, context) => {
      return applyMutation(context, async db => addJob(db, args.input));
    }
  },
  Job: {
    company: async _parent => {
      const db = await buildDb();
      return getCompanyByJobPublicId(db, _parent.id);
    }
  }
};

// @ts-ignore
export function getContext({ req }: { req: Request }) {
  const context: RemotedContext = {
    authorizationHeader: req.header("Authorization")
  };
  return context;
}

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  context: getContext
});
