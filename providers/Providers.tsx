"use client";

import React, { PropsWithChildren } from "react";
import QueryProvider from "./QueryProvider";
import NextNProgress from "nextjs-progressbar";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <>
      <NextNProgress showOnShallow color="white" />
      <QueryProvider>{children}</QueryProvider>
    </>
  );
};

export default Providers;
