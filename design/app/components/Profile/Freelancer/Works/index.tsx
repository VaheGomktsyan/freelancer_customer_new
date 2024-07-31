"use client";
import { useGetWorksQuery } from "@/lib/features/work/workSlice";
import { IApply, IWork } from "@/type/type";
import { useRouter } from "next/navigation";

export const Works = ()=>{
    const router = useRouter();
    const { data } = useGetWorksQuery("");
    console.log(data);

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
                    {data?.map((elm: IWork, index:number) => (
                        <tr key={index}>
                            <td>{elm.name}</td>
                            <td>{elm.description}</td>
                            <td>{elm.price}</td>
                            <td>
                            {elm.workApplys.length && elm.workApplys[0].status==1 ? <></>:<button>Send</button>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}