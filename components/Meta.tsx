import Head from "next/head";
import * as React from "react";
import "../styles/bulma.scss";
import { Script } from "./Script";

export const Meta = () => (
  <>
    <Head>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=UA-89807105-2"
      />
      <Script>
        {() => {
          // @ts-ignore
          window.dataLayer = window.dataLayer || [];
          function gtag() {
            // @ts-ignore
            dataLayer.push(arguments);
          }
          // @ts-ignore
          gtag("js", new Date());
          // @ts-ignore
          gtag("config", "UA-89807105-2");
        }}
      </Script>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      />
      <meta name="theme-color" content="#209cee" />
      <link
        href="https://fonts.googleapis.com/css?family=Fredoka+One"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.7.1/css/all.css"
        integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
        crossOrigin="anonymous"
      />
    </Head>
  </>
);
