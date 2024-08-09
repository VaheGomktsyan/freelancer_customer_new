"use client";
import { useProfilePageMutation } from "@/lib/features/user/userSlice";
import {
    useGetWorksQuery,
    useSendApplyMutation,
} from "@/lib/features/work/workSlice";
import { IWork } from "@/type/type";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const Works = () => {
    const router = useRouter();
    const { data } = useGetWorksQuery("");
    const [sendApply] = useSendApplyMutation();
    console.log(data);
    const [userProfile, results] = useProfilePageMutation();
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
                    {data?.map((elm: IWork, index: number) => (
                        <tr key={index}>
                            <td>{elm.name}</td>
                            <td>{elm.description}</td>
                            <td>{elm.price}</td>
                            <td>
                                {elm.workApplys.length &&
                                elm.workApplys[0].status == 1 ? (
                                    <></>
                                ) : (
                                    elm.workApplys.some(e=>e.freelancerId == results?.data?.id)?
                                    <button disabled>sss</button>:
                                    <button type="submit" onClick={()=>sendApply(elm.id).unwrap().then(console.log)}>Send</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
