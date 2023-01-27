import Title from '@/components/atoms/Title';
import styles from '@/components/molecules/NavBar.module.css';
import Link from 'next/link';

export default function NavBar() {
  return (
    <div className={styles.navbar}>
      <Title />
      <Link href={`/tags`} className={styles.navbarLink}>
        Rune<span>Tags</span>
      </Link>
    </div>
  );
}
