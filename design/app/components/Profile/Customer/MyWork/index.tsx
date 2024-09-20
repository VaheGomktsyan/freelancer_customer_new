"use client";
import {
  useFindByFreelancerQuery,
  useFindByWorkMutation,
} from "@/lib/features/feedback-apply/feedbackApplySlice";
import {
  useDeleteWorkMutation,
  useGetWorkByCustomerQuery,
} from "@/lib/features/work/workSlice";
import { IApply, IWork } from "@/type/type";
import { useRouter } from "next/navigation";
import "./myWork.scss";

export const MyWorkCust = () => {
  const router = useRouter();
  const { data } = useGetWorkByCustomerQuery(0);
  const { data: freelancerId } = useFindByFreelancerQuery("");
  const [workFind, result] = useFindByWorkMutation();
  const [deleteWork] = useDeleteWorkMutation();
  console.log(data);
  console.log("result", result);

  const handleDelete = async (id: number) => {
    try {
      await deleteWork(id).unwrap();
    } catch (err) {
      console.error("Failed to delete the work:", err);
    }
  };

  const findWork = async (id: number) => {
    try {
      console.log("===>", id);
      await workFind(id).unwrap().then(console.warn);
    } catch (err) {
      console.error("Failed:", err);
    }
  };

  return (
    <div className="work_container">
      <div className="work_card">
        <h3>MyWork</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Delete</th>
              <th>Applications</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((elm: IWork) => (
              <tr key={elm.id}>
                <td>{elm.name}</td>
                <td>{elm.description}</td>
                <td>{elm.price}</td>
                <td>
                  <button
                    onClick={() => handleDelete(elm.id)}
                    className="btn btn-primary"
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                    onClick={() => findWork(elm.id)}
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
                <h4 className="modal-title">Freelancers</h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>

              <div className="modal-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th>FirstName</th>
                      <th>LastName</th>
                      <th>Age</th>
                      <th>Email</th>
                      <th>Accept</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.data?.map((elm: IApply, index: number) => (
                      <tr key={index}>
                        <td>{elm.freelancerApply.user.firstName}</td>
                        <td>{elm.freelancerApply.user.lastName}</td>
                        <td>{elm.freelancerApply.user.age}</td>
                        <td>{elm.freelancerApply.user.email}</td>
                        <td>
                          <button className="btn btn-primary">Accept</button>
                        </td>
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
    </div>
  );
};
