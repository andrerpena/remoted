import App, { Container } from "next/app";
import React from "react";
import withApolloClient from "../lib/common/with-apollo-client";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-boost";
import NextSeo from "next-seo";

export const SEO = {
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://remoted.io",
    site_name: "Remoted.io",
    images: [
      {
        url: "https://remoted.io/static/logo.png",
        width: 160,
        height: 160,
        alt: "Remoted.io logo"
      }
    ]
  },
  twitter: {
    handle: "@andrerpena",
    site: "@andrerpena",
    cardType: "summary_large_image"
  }
};

class MyApp extends App<{ apolloClient: ApolloClient<any> }> {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <NextSeo config={SEO} />
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
