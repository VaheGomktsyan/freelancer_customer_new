import { IApply, IFeedback } from "@/type/type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const feedbackApplySlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
    reducerPath: "FeedbackApplyApi",
    tagTypes: ["Apply", "Feedback"],
    endpoints: (build) => ({
        addApply: build.mutation<any, IApply>({
            query: (data: IApply) => ({
                url: `apply`,
                method: "POST",
                body: data,
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }),
            invalidatesTags: ["Apply"],
        }),
        sendApply: build.mutation<any, number>({
            query: (workId: number) => ({
                url: `apply/sendApply`,
                method: "POST",
                body: {workId},
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }),
            invalidatesTags: ["Apply"],
        }),
        getApplys: build.query({
            query: () => ({
                url: `apply`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }),
            providesTags: ["Apply"],
        }),
        findByFreelancer: build.query({
            query: () => ({
                url: `apply/byFreelancer`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }),
            providesTags: ["Apply"],
        }),
        updateApply: build.mutation<void, Pick<IApply, any> & Partial<IApply>>({
            query: ({ workId, ...patch }) => ({
                url: `apply/${workId}`,
                method: "PATCH",
                body: patch,
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }),
            invalidatesTags: ["Apply"],
        }),
        deleteApply: build.mutation({
            query: ({ workId, freelancerId }) => ({
                url: `apply/${workId}/${freelancerId}`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }),
            invalidatesTags: ["Apply"],
        }),
        //  Feedback -------------
        addFeedback: build.mutation<any, IFeedback>({
            query: (data: IFeedback) => ({
                url: `feedback`,
                method: "POST",
                body: data,
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }),
            invalidatesTags: ["Feedback"],
        }),
        updateFeedback: build.mutation<
            void,
            Pick<IFeedback, any> & Partial<IFeedback>
        >({
            query: ({ ...patch }) => ({
                url: `feedback`,
                method: "PATCH",
                body: patch,
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }),
            invalidatesTags: ["Feedback"],
        }),
        deleteFeedback: build.mutation({
            query: ({ workId, freelancerId }) => ({
                url: `feedback/${workId}/${freelancerId}`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }),
            invalidatesTags: ["Feedback"],
        }),
    }),
});

export const {
    useAddApplyMutation,
    useGetApplysQuery,
    useUpdateApplyMutation,
    useDeleteApplyMutation,
    useAddFeedbackMutation,
    useDeleteFeedbackMutation,
    useUpdateFeedbackMutation,
    useFindByFreelancerQuery,
    useSendApplyMutation,
} = feedbackApplySlice;
