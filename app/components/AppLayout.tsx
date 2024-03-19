import { Outlet } from "@remix-run/react";
import { Maybe } from "graphql/jsutils/Maybe";
import { type RootQueryToCategoryConnection } from "~/graphql/__generated__/graphql";

interface AppLayoutProps {
  categories: Maybe<RootQueryToCategoryConnection>;
}

import Header from "./Header";
import Footer from "./Footer";

export default function AppLayout({ categories }: AppLayoutProps) {
  return (
    <>
      <div className="flex-1">
        <Header categories={categories} />
        <div className="p-3">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}
