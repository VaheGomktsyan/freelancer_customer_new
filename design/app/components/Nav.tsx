"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "../styles/layout.module.css";
import {
  useGetProfileQuery,
  useProfilePageMutation,
} from "@/lib/features/user/userSlice";
import "./nav.scss";

export const Nav = () => {
  const pathname = usePathname();
  const { data } = useGetProfileQuery("");
  console.log(data);

  const [userProfile, results] = useProfilePageMutation();
  const router = useRouter();
  console.log("=>", results.data);

  // useEffect(() => {
  //     userProfile("").unwrap().then((res)=>{
  //         console.log("res==>", res);

  //     }).catch(console.warn)
  // }, []);

  return (
    <nav className="nav">
      {data ? (
        <>
          <Link
            className={`${styles.link} ${
              pathname === "/profile" ? styles.active : ""
            }`}
            href="/profile"
            shallow
            passHref
            legacyBehavior
          >
            Profile
          </Link>

          {data && data.role == 0 ? (
            <>
              <>Customer</>
              <Link
                className={`${styles.link} ${
                  pathname === "/profile/customer/addWork" ? styles.active : ""
                }`}
                href="/profile/customer/addWork"
                shallow
                passHref
                legacyBehavior
                >
                AddWork
              </Link>
              <Link
                className={`${styles.link} ${
                  pathname === "/profile/customer/freelancers"
                  ? styles.active
                  : ""
                }`}
                href="/profile/customer/freelancers"
                shallow
                passHref
                legacyBehavior
                >
                Freelancers
              </Link>
              <Link
                className={`${styles.link} ${
                  pathname === "/profile/customer/myWork" ? styles.active : ""
                }`}
                href="/profile/customer/myWork"
                shallow
                passHref
                legacyBehavior
                >
                MyWork
              </Link>
            </>
            
            ) : data && data.role == 1 ? (
            <>
              <>Freelancer</>
              <Link
                className={`${styles.link} ${
                  pathname === "/profile/freelancer/myWork" ? styles.active : ""
                }`}
                href="/profile/freelancer/myWork"
                shallow
                passHref
                legacyBehavior
              >
                MyWork
              </Link>

              <Link
                className={`${styles.link} ${
                  pathname === "/profile/freelancer/works" ? styles.active : ""
                }`}
                href="/profile/freelancer/works"
                shallow
                passHref
                legacyBehavior
              >
                Works
              </Link>
            </>
          ) : data && data.role == 2 ? (
            <>
              <Link
                className={`${styles.link} ${
                  pathname === "/profile/admin/addSkills" ? styles.active : ""
                }`}
                href="/profile/admin/addSkills"
                shallow
                passHref
                legacyBehavior
              >
                AddSkills
              </Link>
              <Link
                className={`${styles.link} ${
                  pathname === "/profile/admin/skills" ? styles.active : ""
                }`}
                href="/profile/admin/skills"
                shallow
                passHref
                legacyBehavior
              >
                Skills
              </Link>
              <Link
                className={`${styles.link} ${
                  pathname === "/profile/admin/users" ? styles.active : ""
                }`}
                href="/profile/admin/users"
                shallow
                passHref
                legacyBehavior
              >
                Users
              </Link>
              <Link
                className={`${styles.link} ${
                  pathname === "/profile/admin/works" ? styles.active : ""
                }`}
                href="/profile/admin/works"
                shallow
                passHref
                legacyBehavior
              >
                Works
              </Link>
            </>
          ) : (
            <></>
          )}
          <Link
            className={`${styles.link} ${
              pathname === "/profile/settings" ? styles.active : ""
            }`}
            href="/profile/settings"
            shallow
            passHref
            legacyBehavior
          >
            Settings
          </Link>
          <button
            onClick={() => {
              delete localStorage.token;
              router.replace("/");
              location.reload();
            }}
          >
            log Out
          </button>
        </>
      ) : (
        <></>
      )}
    </nav>
  );
};
