import { importSchema } from "graphql-import";
import { ApolloServer, gql } from "apollo-server-express";
import { Request } from "express";
import { RemotedContext } from "./remotedContext";
import { buildDb } from "../db/build-db";
import { PAGE_SIZE } from "../../lib/common/constants";
import { addJob, getJob, searchJobs } from "./services/job-service";
import { IResolvers } from "../../graphql-types";
import { config } from "dotenv";
import {
  addCompany,
  getCompanyByDisplayName,
  getCompanyByJobPublicId
} from "./services/company-service";
import { getTagCountGroups, getTags } from "./services/tag-service";
import { RemotedDatabase } from "../db/model";
import {
  getLocationDetailsForCompany,
  getLocationDetailsForJob
} from "./services/location-details-service";

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
      if (args && args.limit && args.limit > 100) {
        throw new Error("LIMIT cannot be greater than 100");
      }
      const db = await buildDb();
      return searchJobs(
        db,
        args.limit || PAGE_SIZE,
        args.offset || 0,
        args.tag,
        args.anywhere,
        args.excludeCountries,
        args.excludeRegions,
        args.salary,
        args.sources,
        args.companyId
      );
    },
    getTags: async (_parent, args) => {
      const db = await buildDb();
      return getTags(db, args.text || "");
    },
    getCompany: async (_parent, args) => {
      const db = await buildDb();
      return getCompanyByDisplayName(db, args.id, args.displayName);
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
    },
    locationDetails: async _parent => {
      const db = await buildDb();
      return getLocationDetailsForJob(db, _parent.id);
    }
  },
  Company: {
    locationDetails: async _parent => {
      const db = await buildDb();
      return getLocationDetailsForCompany(db, _parent.id);
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
