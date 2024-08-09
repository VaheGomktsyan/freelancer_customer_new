import { IAddWork, IWork } from "@/type/type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const workSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
    reducerPath: "WorkApi",
    tagTypes: ["Work", "Apply"],
    endpoints: (build) => ({
        addWork: build.mutation<any, IAddWork>({
            query: (data: IAddWork) => ({
                url: `work`,
                method: "POST",
                body: data,
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }),
            invalidatesTags: ["Work"],
        }),

        sendApply: build.mutation<any, number>({
            query: (workId: number) => ({
                url: `apply/sendApply`,
                method: "POST",
                body: { workId },
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }),
            invalidatesTags: ["Apply","Work"],
        }),
        getWorkByCustomer: build.query({
            query: () => ({
                url: `work/customer/find`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }),
            providesTags: ["Work"],
        }),
        getWorkByFreelancer: build.query({
            query: () => ({
                url: `work/freelancer/find`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }),
            providesTags: ["Work"],
        }),
        getWorks: build.query({
            query: () => ({
                url: `work`,
                method: "GET",
            }),
            providesTags: ["Work"],
        }),
        updateWork: build.mutation<void, Pick<IWork, any> & Partial<IWork>>({
            query: ({ id, ...patch }) => ({
                url: `work/${id}`,
                method: "PATCH",
                body: patch,
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }),
            invalidatesTags: ["Work"],
        }),
        deleteWork: build.mutation({
            query: (id) => ({
                url: `work/${id}`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }),
            invalidatesTags: ["Apply","Work"],
        }),
    }),
});

export const {
    useGetWorkByCustomerQuery,
    useGetWorkByFreelancerQuery,
    useGetWorksQuery,
    useDeleteWorkMutation,
    useAddWorkMutation,
    useUpdateWorkMutation,
    useSendApplyMutation,
} = workSlice;
