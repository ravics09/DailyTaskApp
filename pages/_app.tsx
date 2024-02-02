"use client"
import React from "react";
import type { AppProps } from "next/app";
import { SessionProvider } from 'next-auth/react';
import Layout from "../components/layout/layout";

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default App;
