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
                        shallow
                        passHref legacyBehavior
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
                                shallow
                                passHref legacyBehavior
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
                                shallow
                                passHref legacyBehavior
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
                                shallow
                                passHref legacyBehavior
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
                                shallow
                                passHref legacyBehavior
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
                                shallow
                                passHref legacyBehavior
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
                                shallow
                                passHref legacyBehavior
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
                                shallow
                                passHref legacyBehavior
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
                                shallow
                                passHref legacyBehavior
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
                                shallow
                                passHref legacyBehavior
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
                            pathname === "/profile/settings"
                                ? styles.active
                                : ""
                        }`}
                        href="/profile/settings"
                        shallow
                        passHref legacyBehavior
                    >
                        Settings
                    </Link>
                    <button
                        onClick={() => {
                            delete localStorage.token;
                            router.replace("/");
                            router.refresh()
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
                        shallow
                        passHref legacyBehavior
                    >
                        Login
                    </Link>
                    <Link
                        className={`${styles.link} ${
                            pathname === "/register" ? styles.active : ""
                        }`}
                        href="/register"
                        shallow
                        passHref legacyBehavior
                        replace={false}
                    >
                        Register
                    </Link>
                </>
            )}
        </nav>
    );
};
