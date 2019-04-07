import App, { Container } from "next/app";
import React from "react";
import withApolloClient from "../lib/common/with-apollo-client";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-boost";

class MyApp extends App<{ apolloClient: ApolloClient<any> }> {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WJ9JR3Z"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
