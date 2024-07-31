"use client";
import {
    useGetWorksQuery,
} from "@/lib/features/work/workSlice";
import { IWork } from "@/type/type";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export const Work = () => {
    const router = useRouter();
    const { data } = useGetWorksQuery("");
    console.log("data");

    return (
        <div>
            <h3>Works</h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((elm: IWork) => (
                        <tr key={elm.id}>
                            <td>{elm.name}</td>
                            <td>{elm.description}</td>
                            <td>{elm.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
