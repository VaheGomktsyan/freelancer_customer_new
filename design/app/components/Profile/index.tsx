"use client";
import { useProfilePageMutation } from "@/lib/features/user/userSlice";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Customer } from "./Customer";
import { Freelancer } from "./Freelancer";
import { Admin } from "./Admin";
import styles from "../../styles/layout.module.css";

export const Profile = () => {
  const [userProfile, results] = useProfilePageMutation();
  const router = useRouter();

  useEffect(() => {
    userProfile("")
      .unwrap()
      .then()
      .catch((err) => {
        router.push("/");
      });
  }, []);

  return (
    <div className={styles.profile}>
      <h3>
        {results?.data?.firstName}
        {results?.data?.lastName}
      </h3>
      <img src={"http://localhost:3001/" + results?.data?.picUrl} />
      <p>{results?.data?.email}</p>
      {results && results.data ? (
        <>
          {results.data.role == 0 ? (
            <Customer user={results.data} />
          ) : results.data.role == 1 ? (
            <Freelancer user={results.data} />
          ) : results.data.role == 2 ? (
            <Admin user={results.data} />
          ) : (
            <></>
          )}
        </>
      ) : (
        <>Loading ...</>
      )}
    </div>
  );
};
