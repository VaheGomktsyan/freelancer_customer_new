"use client";
import { useGetUsersQuery } from "@/lib/features/user/userSlice";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export const Users = () => {
    const router = useRouter();
    const { data } = useGetUsersQuery("")
    console.log(data);

    return (
        <div>
            <h3>GetUsers</h3>
        </div>
    );
};
