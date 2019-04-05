import * as next from "next";
import * as express from "express";
import { fromExpressRequest } from "../lib/server/url";
import { apolloServer } from "./graphql/apollo-server";
import { config } from "dotenv";
import { extractTagFromPath } from "../lib/common/url";

config();

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const nextServer = next({ dev });
const nextRequestHandler = nextServer.getRequestHandler();

nextServer.prepare().then(() => {
  const app = express();

  app.get("/job/:public_id", (req, res) => {
    nextServer.render(req, res, "/job", { publicId: req.params.public_id });
  });

  apolloServer.applyMiddleware({ app });

  app.get("/:path", (req, res) => {
    const path = req.params.path;
    const tag = extractTagFromPath(path);
    if (tag) {
      return nextServer.render(req, res, "/", { tag });
    }
    return nextRequestHandler(req, res, fromExpressRequest(req));
  });

  app.get("*", (req, res) => {
    return nextRequestHandler(req, res, fromExpressRequest(req));
  });

  app.listen(port, (err: Error) => {
    if (err) throw err;
    console.log(`🚀 Ready on http://localhost:${port}`);
    console.log(
      `🚀 Apollo server ready at http://localhost:${port}${
        apolloServer.graphqlPath
      }`
    );
  });
});
