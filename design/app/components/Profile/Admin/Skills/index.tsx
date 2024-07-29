"use client";
import {
    useDeleteSkillMutation,
    useGetSkillsQuery,
} from "@/lib/features/skill/skillSlice";
import { ISkill } from "@/type/type";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export const Skills = () => {
    const router = useRouter();
    const { data } = useGetSkillsQuery("");
    const [deleteSkill] = useDeleteSkillMutation();
    console.log(data);

    const handleDelete = async (id:number) => {
        try {
          await deleteSkill(id).unwrap();
        } catch (err) {
          console.error('Failed to delete the post:', err);
        }
      };

    return (
        <div>
            <h3>Skills</h3>
            <table>
                <thead>
                    <tr>
                        <th>SkillName</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((elm: ISkill) => (
                        <tr key={elm.id}>
                            <td>{elm.name}</td>
                            <td>
                                <button
                                    onClick={() =>
                                        handleDelete(elm?.id)
                                    }
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
