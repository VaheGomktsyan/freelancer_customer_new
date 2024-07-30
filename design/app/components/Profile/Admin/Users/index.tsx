"use client";
import {
    useDeleteUserByIdMutation,
    useGetUsersQuery,
} from "@/lib/features/user/userSlice";
import { IUser } from "@/type/type";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export const Users = () => {
    const router = useRouter();
    const { data } = useGetUsersQuery("");
    const [deleteUserById] = useDeleteUserByIdMutation();
    console.log(data);

    const handleDelete = async (id: number) => {
        try {
            console.log(id);
            
            await deleteUserById(id).unwrap().then(console.log);
        } catch (err) {
            console.error("Failed to delete the post:", err);
        }
    };

    return (
        <div>
            <h3>Users</h3>
            <table>
                <thead>
                    <tr>
                        <th>firstName</th>
                        <th>lastName</th>
                        <th>email</th>
                        <th>role</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((elm: IUser) => (
                        <tr key={elm.id}>
                            <td>{elm.firstName}</td>
                            <td>{elm.lastName}</td>
                            <td>{elm.email}</td>
                            <td>{elm.role}</td>
                            <td>
                                <button
                                    onClick={() => handleDelete(elm.id)}
                                >Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
