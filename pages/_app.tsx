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
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
