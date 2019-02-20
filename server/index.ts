import * as next from "next";
import * as express from "express";
import { fromExpressRequest } from "./lib/url";
import { apolloServer } from "./graphql/apollo-server";
import { config } from "dotenv";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const nextServer = next({ dev });
const nextRequestHandler = nextServer.getRequestHandler();

config();

nextServer.prepare().then(() => {
  const app = express();

  app.get("/a", (req, res) => {
    nextServer.render(req, res, "/about", req.query);
  });

  apolloServer.applyMiddleware({ app });

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
