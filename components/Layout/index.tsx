'use client'
import React, { PropsWithChildren } from "react";
import Header from "./Header";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Header />
      <main className="min-h-screen bg-slate-800">{children}</main>
    </div>
  );
};

export default Layout;
