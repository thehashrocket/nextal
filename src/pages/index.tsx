import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import Button from "@/components/atoms/button";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import styles from "./index.module.css";

const Home: NextPage = () => {
  const { user: currentUser } = useCurrentUser();

  return (
    <>
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
          <p>
            Welcome to Witness to Love. Please login or register using the links
            below to access your WTL courses.
          </p>
          <p>
            Please email{" "}
            <a href="mailto:techsupport@witnesstolove.org">
              techsupport@witnesstolove.org
            </a>{" "}
            with login issues.
          </p>
          <p>
            {currentUser
              ? `Hello ${currentUser.username}`
              : "You are not logged in !"}
          </p>
          <Button>
            <Link href="/login">Login</Link>
          </Button>
          <Button>
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Home;
