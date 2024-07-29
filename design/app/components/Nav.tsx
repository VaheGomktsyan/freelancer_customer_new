"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import styles from "../styles/layout.module.css";
import { useProfilePageMutation } from "@/lib/features/user/userSlice";
import { useEffect } from "react";

export const Nav = () => {
    const pathname = usePathname();
    const [userProfile, results] = useProfilePageMutation();
    const router = useRouter();
    console.log("=>", results.data);

    useEffect(() => {
        userProfile("").unwrap().then().catch(console.warn);
    }, []);

    return (
        <nav className={styles.nav}>
            {results && results.data ? (
                <>
                    <Link
                        className={`${styles.link} ${
                            pathname === "/profile" ? styles.active : ""
                        }`}
                        href="/profile"
                    >
                        Profile
                    </Link>

                    {results && results.data && results.data.role == 0 ? (
                        <>
                            <>Customer</>
                            {/* Create customer page ----------------- */}
                        </>
                    ) : results && results.data && results.data.role == 1 ? (
                        <>
                            <>Freelancer</>
                        </>
                    ) : results && results.data && results.data.role == 2 ? (
                        <>
                            <br />
                            <Link
                                className={`${styles.link} ${
                                    pathname === "/profile/admin/addSkills"
                                        ? styles.active
                                        : ""
                                }`}
                                href="/profile/admin/addSkills"
                            >
                                AddSkills
                            </Link>
                            <br />
                            <Link
                                className={`${styles.link} ${
                                    pathname === "/profile/admin/skills"
                                        ? styles.active
                                        : ""
                                }`}
                                href="/profile/admin/skills"
                            >
                                Skills
                            </Link>
                            <br />
                            <Link
                                className={`${styles.link} ${
                                    pathname === "/profile/admin/users"
                                        ? styles.active
                                        : ""
                                }`}
                                href="/profile/admin/users"
                            >
                                Users
                            </Link>
                            <br />
                            <Link
                                className={`${styles.link} ${
                                    pathname === "/profile/admin/works"
                                        ? styles.active
                                        : ""
                                }`}
                                href="/profile/admin/works"
                            >
                                Works
                            </Link>
                        </>
                    ) : (
                        <></>
                    )}
                    <br />
                    <button
                        onClick={() => {
                            delete localStorage.token;
                            router.replace("/");
                        }}
                    >
                        log Out
                    </button>
                </>
            ) : (
                <>
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
                </>
            )}
        </nav>
    );
};
