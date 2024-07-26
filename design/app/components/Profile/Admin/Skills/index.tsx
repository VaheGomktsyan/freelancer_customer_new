"use client";
import { useGetSkillsQuery } from "@/lib/features/skill/skillSlice";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export const Skills = () => {
    const router = useRouter();
    const { data } = useGetSkillsQuery(0);
    console.log(data);

    return (
        <div>
            <h3>GetSkills</h3>
        </div>
    );
};
