"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import styles from "../styles/layout.module.css";

export const Navlogin = () => {
    const pathname = usePathname();
    return (
        <nav className={styles.nav}>
            <Link
                className={`${styles.link} ${
                    pathname === "/" ? styles.active : ""
                }`}
                href="/"
            >
                Login
            </Link>
            <Link
                className={`${styles.link} ${
                    pathname === "/register" ? styles.active : ""
                }`}
                href="/register"
            >
                Register
            </Link>
        </nav>
    );
};
