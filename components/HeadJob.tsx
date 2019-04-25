import * as React from "react";
import Head from "next/head";
import { PAGE_DESCRIPTION } from "../lib/common/constants";

export interface HeadJobPageProps {
  title: string;
  companyDisplayName: string;
}

export const HeadJobPage: React.FunctionComponent<HeadJobPageProps> = ({
  title,
  companyDisplayName
}: HeadJobPageProps) => {
  return (
    <Head>
      <title>
        Remote job: {title} at {companyDisplayName}
      </title>
      <meta
        key={"description"}
        name={"description"}
        content={PAGE_DESCRIPTION}
      />
    </Head>
  );
};
