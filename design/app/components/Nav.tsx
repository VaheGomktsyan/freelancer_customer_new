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
    // console.log("=>", results.data);

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
                            <br />
                            <>Customer</>
                            <br />
                            <Link
                                className={`${styles.link} ${
                                    pathname === "/profile/customer/addWork"
                                        ? styles.active
                                        : ""
                                }`}
                                href="/profile/customer/addWork"
                            >
                                AddWork
                            </Link>
                            <br />
                            <Link
                                className={`${styles.link} ${
                                    pathname === "/profile/customer/freelancers"
                                        ? styles.active
                                        : ""
                                }`}
                                href="/profile/customer/freelancers"
                            >
                                Freelancers
                            </Link>
                            <br />

                            <Link
                                className={`${styles.link} ${
                                    pathname === "/profile/customer/myWork"
                                        ? styles.active
                                        : ""
                                }`}
                                href="/profile/customer/myWork"
                            >
                                MyWork
                            </Link>
                        </>
                    ) : results && results.data && results.data.role == 1 ? (
                        <>
                            <>Freelancer</>


                            <Link
                                className={`${styles.link} ${
                                    pathname === "/profile/freelancer/myWork"
                                        ? styles.active
                                        : ""
                                }`}
                                href="/profile/freelancer/myWork"
                            >
                                MyWork
                            </Link>


                            <Link
                                className={`${styles.link} ${
                                    pathname === "/profile/freelancer/works"
                                        ? styles.active
                                        : ""
                                }`}
                                href="/profile/freelancer/works"
                            >
                                Works
                            </Link>

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
                    <Link
                        className={`${styles.link} ${
                            pathname === "/profile/settings" ? styles.active : ""
                        }`}
                        href="/profile/settings"
                    >
                        Settings
                    </Link>
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
