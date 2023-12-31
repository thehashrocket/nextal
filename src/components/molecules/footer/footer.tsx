import styles from "./footer.module.css";

const Footer = (): JSX.Element => {
  return (
    <footer className={styles.footer}>
      <a className={styles.link} href="https://github.com/jvidalv">
        {new Date().getFullYear()} Witness to Love. All Rights Reserved.
      </a>
    </footer>
  );
};

export default Footer;
