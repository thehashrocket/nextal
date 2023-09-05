// A NextJS Page displaying a Page wiht some generic about us content.

import { NextPage } from "next";
import Head from "next/head";
import Button from "@/components/atoms/button";

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-6xl font-bold">About</h1>
        <p className="mt-3 text-2xl">
          Catholic Marriage Mentoring and Prep for Couples - Witness to Love
        </p>
      </div>
    </>
  );
};

export default About;
