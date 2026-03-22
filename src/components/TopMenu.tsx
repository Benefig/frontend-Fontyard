import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import styles from './topmenu.module.css';

export default async function TopMenu() {
    const session = await getServerSession(authOptions);
    const isAdmin = session?.user.role === 'admin' || session?.user.role === 'PomPhet';

    return (
        <nav className={styles.nav}>
            <Link href="/" className={styles.logo}>
                Fontyard
            </Link>

            <div className={styles.navLinks}>
                <Link href="/hotel" className={styles.navLink}>รายชื่อโรงแรม</Link>
                {session && (
                    <Link href="/mybooking" className={styles.navLink}>การจองของฉัน</Link>
                )}
                {isAdmin && (
                    <Link href="/admin/dashboard" className={styles.navLink}>แอดมิน</Link>
                )}
            </div>

            <div className={styles.authSection}>
                {session ? (
                    <div className={styles.userMenu}>
                        <div className={styles.userBtn}>
                            <div className={styles.userInfo}>
                                <span className={styles.userName}>{session.user.name}</span>
                                <span className={styles.userRole}>{session.user.role === 'admin' || session.user.role === 'PomPhet' ? 'แอดมิน' : 'ผู้ใช้'}</span>
                            </div>
                            <span style={{ fontSize: 11 }}>▾</span>
                        </div>
                        <div className={styles.dropdown}>
                            <Link href="/my/profile" className={styles.dropdownItem}>โปรไฟล์</Link>
                            <div className={styles.dropdownDivider} />
                            <Link href="/auth/signout" className={styles.dropdownItem}>ออกจากระบบ</Link>
                        </div>
                    </div>
                ) : (
                    <>
                        <Link href="/auth/signin" className={styles.signInBtn}>เข้าสู่ระบบ</Link>
                        <Link href="/auth/register" className={styles.signUpBtn}>สมัครสมาชิก</Link>
                    </>
                )}
            </div>
        </nav>
    );
}
