"use client";
import {
    useDeleteWorkMutation,
    useGetWorkByCustomerQuery,
} from "@/lib/features/work/workSlice";
import { IWork } from "@/type/type";
import { useRouter } from "next/navigation";

export const MyWorkCust = () => {
    const router = useRouter();
    const { data } = useGetWorkByCustomerQuery(0);
    // console.log(data);

    const [deleteWork] = useDeleteWorkMutation();

    const handleDelete = async (id: number) => {
        try {
            await deleteWork(id).unwrap();
        } catch (err) {
            console.error("Failed to delete the work:", err);
        }
    };
    return (
        <div>
            <h3>MyWork</h3>
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
                    {data?.map((elm: IWork) => (
                        <tr key={elm.id}>
                            <td>{elm.name}</td>
                            <td>{elm.description}</td>
                            <td>{elm.price}</td>
                            <td>
                                <button onClick={() => handleDelete(elm.id)}>
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
