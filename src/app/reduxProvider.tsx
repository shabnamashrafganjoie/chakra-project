"use client";

import { Provider } from "react-redux";
import  Store  from "@/store/store";

interface Props {
  children: React.ReactNode;
}

export function ReduxProviders({ children }: Props) {
  return <Provider store={Store}>{children}</Provider>;
}
