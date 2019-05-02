import * as next from "next";
import * as express from "express";
import { fromExpressRequest } from "../lib/server/url";
import { apolloServer } from "./graphql/apollo-server";
import { config } from "dotenv";
import { extractIndexQueryFromPath } from "../lib/common/url";
import { buildSiteMap } from "./sitemap";

config();

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const nextServer = next({ dev });
const nextRequestHandler = nextServer.getRequestHandler();

nextServer.prepare().then(() => {
  const app = express();

  app.get("/sitemap.xml", async function(_req: any, res: any) {
    const sitemap = await buildSiteMap();
    sitemap.toXML(function(err: any, xml: any) {
      if (err) {
        console.error(err);
        return res.status(500).end();
      }
      res.header("Content-Type", "application/xml");
      res.send(xml);
    });
  });

  app.get("/job/:public_id", (req, res) => {
    nextServer.render(req, res, "/job", { publicId: req.params.public_id });
  });

  apolloServer.applyMiddleware({ app });

  app.get("/companies/:company", (req, res) => {
    return nextServer.render(req, res, "/", {
      ...req.query,
      company: req.params.company
    });
  });

  app.get("/:path", (req, res) => {
    const path = req.params.path;
    // process tag
    const indexQuery = extractIndexQueryFromPath(path);
    if (indexQuery) {
      return nextServer.render(req, res, "/", { ...req.query, ...indexQuery });
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
