import { importSchema } from "graphql-import";
import { ApolloServer, gql } from "apollo-server-express";
import { Request } from "express";
import { Context } from "./context";
import { buildDb } from "../db/build-db";
import { PAGE_SIZE } from "../constants";
import { addJob, getJob, getJobs } from "./services/job-service";
import { IResolvers } from "../../graphql-types";
import {
  addCompany,
  getCompany,
  getCompanyByJobPublicId,
  getCompanyUrls
} from "./services/company-service";
import {
  getSourceByJobPublicId,
  updateSource
} from "./services/source-service";
import { getTagCountGroups, getTags } from "./services/tag-service";

const typeDefs = gql(importSchema("server/graphql/schema.graphql"));

type Resolvers = IResolvers & {
  [key: string]: any;
};

const resolvers: Resolvers = {
  Query: {
    getJobs: async (_parent, args) => {
      const db = await buildDb();
      return getJobs(db, args.limit || PAGE_SIZE, args.offset || 0);
    },
    getTags: async (_parent, args) => {
      const db = await buildDb();
      return getTags(db, args.text || "");
    },
    getCompany: async (_parent, args) => {
      const db = await buildDb();
      return getCompany(db, args.id, args.url);
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
    addCompany: async (_parent, args) => {
      const db = await buildDb();
      return addCompany(db, args.input);
    },
    addJob: async (_parent, args) => {
      const db = await buildDb();
      return addJob(db, args.input);
    },
    updateSource: async (_parent, args) => {
      const db = await buildDb();
      return updateSource(db, args.input);
    }
  },
  Job: {
    company: async _parent => {
      const db = await buildDb();
      return getCompanyByJobPublicId(db, _parent.id);
    },
    source: async _parent => {
      const db = await buildDb();
      return getSourceByJobPublicId(db, _parent.id);
    }
  },
  Company: {
    urls: async _parent => {
      const db = await buildDb();
      return getCompanyUrls(db, _parent.id);
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
  introspection: true,
  context: getContext
});
