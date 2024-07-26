"use client";
import { useProfilePageMutation } from "@/lib/features/user/userSlice";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Customer } from "./Customer";
import { Freelancer } from "./Freelancer";
import { Admin } from "./Admin";

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
        <div>
            <h3>
                {results?.data?.firstName}
                {results?.data?.lastName}
            </h3>
            <p>{results?.data?.email}</p>
            <img
                width={200}
                src={"http://localhost:3001/" + results?.data?.picUrl}
            />
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
