"use client";
import {
    useGetWorkByFreelancerQuery,
} from "@/lib/features/work/workSlice";
import { IApply, IWork } from "@/type/type";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export const MyWorkFree = () => {
    const router = useRouter();
    const { data } = useGetWorkByFreelancerQuery("");
    console.log(data);

    return (
        <div>
            <h3>MyWorkFree</h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((elm: IApply, index: number) => (
                        <tr key={index}>
                            <td>{elm.workApply.name}</td>
                            <td>{elm.workApply.description}</td>
                            <td>{elm.workApply.price}</td>
                            <td>
                                {elm.status == 0 ? <button>x</button> : <></>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};