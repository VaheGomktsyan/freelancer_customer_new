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
                    {/* <>Customer</> */}
                    {/* Create customer page ----------------- */}
                </>
            ) : results && results.data && results.data.role == 1 ? (
                <>
                    <>Freelancer</>
                </>
            ) :  results && results.data && results.data.role == 2 ? (
              <>
                  <>Admin</>
              </>
          ) : (
                <></>
            )}
            <button
                onClick={() => {
                    delete localStorage.token;
                    router.replace("/");
                }}
            >
                log Out
            </button>
        </nav>
    );
};
