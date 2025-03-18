"use client";

import { ReduxProvider } from "./redux-provider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <ReduxProvider>{children}</ReduxProvider>;
};

export default Providers;
