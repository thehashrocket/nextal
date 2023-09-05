import type { AppProps } from "next/app";
import Layout from "@/components/organisms/layout";
import "../styles/globals.css";
import styles from "./app.module.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} className={styles.layoutContainer} />
    </Layout>
  );
};

export default MyApp;
