import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import { useLogout } from "@/hooks/auth/useLogout";
import Head from "next/head";
import Button from "@/components/atoms/button";

const Me: NextPage = () => {
  const [editMode, setEditMode] = useState(false);
  const { user: currentUser } = useCurrentUser();
  const { logout } = useLogout();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Me</title>
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-6xl font-bold">Me</h1>
        <p className="mt-3 text-2xl">
          Catholic Marriage Mentoring and Prep for Couples - Witness to Love
        </p>
        {/* Button is used to hit the api/users/me endpoint */}
        <div className="font-semibold">You are: {currentUser?.username}</div>
        {currentUser?.avatar && (
          <img alt="" className="max-w-120 max-h-80" src={currentUser.avatar} />
        )}
        <Button
          onClick={async () => {
            // const response = await fetch('/api/users/me');
            const response = await fetch("/api/users/course_accesses");
            const data = await response.json();
            console.log(data);
          }}
        >
          Hit the API endpoint
        </Button>
      </div>
    </>
  );
};

export default Me;
