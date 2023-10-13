import Header from "@/components/molecules/header";
import Footer from "@/components/molecules/footer";
import NavSideBar from "@/components/molecules/navsidebar";
import { FCC } from "src/types/react";

import styles from "./layout.module.css";

const Layout: FCC = ({ children }) => {
  return (
    <div className={styles.layout}>
      <div className={styles.innerLayout}>
        <Header />
        <div className={styles.bodyWrapper}>
          <NavSideBar />
          <main className={styles.main}>
            <div className={styles.innerMain}>{children}</div>
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
