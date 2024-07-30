"use client";

import { useGetFreelancersQuery } from "@/lib/features/freelancer/freelancerSlice";
import { IFreelancer, IUser } from "@/type/type";
import { useRouter } from "next/navigation";

export const Freelancers = () => {
    const router = useRouter();
    const { data } = useGetFreelancersQuery("");
// console.log(data);

    return (
        <div>
            <h3>Freelancers</h3>
            <table>
                <thead>
                    <tr>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Email</th>
                        <th>Salary</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((elm:IFreelancer) => (
                        <tr key={elm.userId}>
                            <td>{elm.user.firstName}</td>
                            <td>{elm.user.lastName}</td>
                            <td>{elm.user.email}</td>
                            <td>{elm.salary}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
