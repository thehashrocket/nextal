import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import Button from "@/components/atoms/button";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";

import LoginForm from "@/components/organisms/LoginForm";

import styles from "./login.module.css";

const Login: NextPage = () => {
  const router = useRouter();
  const { msg } = router.query;
  return (
    <>
      {msg ? <h3 className="red">{msg}</h3> : <></>}
      <Head>
        <title>Witness To Love - Parish App</title>
        <meta
          name="description"
          content="NextJs starter template using TypeScript and Tailwind"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.copyOuter}>
        <div className={styles.copyInner}>
          <h1>Login</h1>
          <p>
            Welcome to Witness to Love. Please login or register using the links
            below to access your WTL courses.
          </p>
          <LoginForm />
        </div>
      </section>
    </>
  );
};

export default Login;
