"use client";

import DarkModeProvider from "./darkModeProvider";
import StoreProvider from "./redux";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DarkModeProvider>{children}</DarkModeProvider>
    </StoreProvider>
  );
};

export default Providers;
