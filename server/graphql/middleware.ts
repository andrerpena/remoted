import * as graphqlHTTP from "express-graphql";
import { schema } from "./schema";

export const middleware = graphqlHTTP({
  schema: schema,
  graphiql: true
});
