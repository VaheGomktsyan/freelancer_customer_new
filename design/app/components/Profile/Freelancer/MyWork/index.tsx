"use client";
import { useGetWorksQuery } from "@/lib/features/work/workSlice";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export const MyWorkFree = () => {
    const router = useRouter();
    const { data } = useGetWorksQuery("");
    console.log("");
    return (
        <div>
            <h3>MyWorkFree</h3>
        </div>
    );
};
