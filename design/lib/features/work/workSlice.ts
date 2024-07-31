import { IAddWork, IWork } from "@/type/type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const workSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/work" }),
    reducerPath: "WorkApi",
    tagTypes: ["Work"],
    endpoints: (build) => ({
        addWork: build.mutation<any, IAddWork>({
            query: (data: IAddWork) => ({
                url: ``,
                method: "POST",
                body: data,
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }),
            invalidatesTags: ["Work"],
        }),
        getWorkByCustomer: build.query({
            query: () => ({
                url: `/customer/find`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }),
            providesTags: ["Work"],
        }),
        getWorkByFreelancer: build.query({
            query: () => ({
                url: `/freelancer/find`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }),
            providesTags: ["Work"],
        }),
        getWorks: build.query({
            query: () => ({
                url: ``,
                method: "GET",
            }),
            providesTags: ["Work"],
        }),
        updateWork: build.mutation<void, Pick<IWork, any> & Partial<IWork>>({
            query: ({ id, ...patch }) => ({
                url: `/${id}`,
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
                url: `/${id}`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }),
            invalidatesTags: ["Work"],
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
} = workSlice;
