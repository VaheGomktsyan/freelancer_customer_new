"use client";
import { useGetWorksQuery } from "@/lib/features/work/workSlice";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export const Work = () => {
    const router = useRouter();
    const { data } = useGetWorksQuery(0);
    console.log('data');
    return (
        <div>
            <h3>Work</h3>
        </div>
    );
};
