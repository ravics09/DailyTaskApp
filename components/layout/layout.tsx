import React from "react";
import Head from "next/head";
import { ThemeProvider } from "next-themes";

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
      <ThemeProvider enableSystem={true} attribute="class">
        <Head>
          <title>Daily Task Note App</title>
        </Head>
        <div className="flex flex-col min-h-[100vh]">
          <main className="flex-grow  md:mt-40">{children}</main>
        </div>
      </ThemeProvider>
  );
};

export default Layout;
