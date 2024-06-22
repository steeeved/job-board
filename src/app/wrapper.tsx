import React from "react";
import Providers from "./providers";
import * as dynamoose from "dynamoose";
import Navbar from "@/app/(components)/Navbar";
import Header from "@/app/(components)/Header";

if (typeof window === "undefined") {
  dynamoose.aws.ddb.local();
}

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <div className="w-full h-auto dark:bg-black">
        <Navbar />
        <Header />
        {children}
      </div>
    </Providers>
  );
};

export default Wrapper;
