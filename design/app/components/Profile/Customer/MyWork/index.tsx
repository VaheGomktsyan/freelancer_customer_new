"use client";
import { useFindByFreelancerQuery } from "@/lib/features/feedback-apply/feedbackApplySlice";
import {
    useDeleteWorkMutation,
    useGetWorkByCustomerQuery,
} from "@/lib/features/work/workSlice";
import { IApply, IWork } from "@/type/type";
import { useRouter } from "next/navigation";

export const MyWorkCust = () => {
    const router = useRouter();
    const { data } = useGetWorkByCustomerQuery(0);
    const { data: freelancerId } = useFindByFreelancerQuery("");
    console.log(data);

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
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#myModal"
                                >
                                    Open modal
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="modal" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Modal Heading</h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>

                        <div className="modal-body">
<table>
    <thead></thead>
    <tbody>
        {data?.map((elm:IApply,index:number)=>(
            <tr key={index}>
                <td>{elm.active}</td>
                <td>{elm.status}</td>
            </tr>
        ))}
    </tbody>
</table>

                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
