import Image from "next/image";
import styles from "./header.module.css";

const Header = (): JSX.Element => {
  return (
    <header className={styles.header}>
      <Image
        src="/images/img-witness_to_love_logo.png"
        alt="Witness to Love Logo"
        width={500}
        height={500}
      />
    </header>
  );
};

export default Header;
