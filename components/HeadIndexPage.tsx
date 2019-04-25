import * as React from "react";
import { IndexQuery } from "../lib/common/query-types";
import Head from "next/head";

export interface IndexPageHeadProps {
  query: IndexQuery;
}

export const HeadIndexPage: React.FunctionComponent<IndexPageHeadProps> = ({

}: IndexPageHeadProps) => {
  const description =
    "Remoted.io is remote job aggregator for developers and IT professionals. Remoted indexes StackOverflow, WeWorkRemotely, AuthenticJobs and more...";
  return (
    <Head>
      <meta key={"description"} name={"description"} content={description} />
    </Head>
  );
};
