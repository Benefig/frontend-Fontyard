import Link from 'next/link';
import styles from './topmenu.module.css';
import TopMenuAuth from './TopMenuAuth';

export default function TopMenu() {
    return (
        <nav className={styles.nav}>
            <Link href="/" className={styles.logo}>
                Fontyard
            </Link>

            <TopMenuAuth />
        </nav>
    );
}
