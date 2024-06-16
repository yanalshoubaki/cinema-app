"use client";

import React, { PropsWithChildren } from "react";
import QueryProvider from "./QueryProvider";
import ThemeProvider from "./ThemeProvider";
import NextNProgress from 'nextjs-progressbar';

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <>
      <NextNProgress showOnShallow color="white"/>
      <QueryProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </QueryProvider>
    </>
  );
};

export default Providers;
