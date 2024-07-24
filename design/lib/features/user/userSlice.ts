import { IIsVerify, ILogin, IRegister, IUser } from "@/type/type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const userApiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
    reducerPath: "UserApi",
    tagTypes: ["User", "Login"],
    endpoints: (build) => ({
        register: build.mutation<any, IRegister>({
            query: (obj: IRegister) => ({
                url: `auth/register`,
                method: "POST",
                body: obj,
            }),
            invalidatesTags: ["User"],
        }),
        login: build.mutation<any, ILogin>({
            query: (obj: ILogin) => ({
                url: `auth/login`,
                method: "POST",
                body: obj,
            }),
            invalidatesTags: ["Login"],
        }),
        isVerify: build.mutation<any, IIsVerify>({
            query: (obj: IIsVerify) => ({
                url: `auth/isVerify`,
                method: "POST",
                body: obj,
            }),
            invalidatesTags: ["Login"],
        }),
        profilePage: build.mutation({
            query: () => ({
                url: `auth/profile`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }),
            invalidatesTags: ["User"],
        }),
        adminPage: build.mutation({
            query: () => ({
                url: `auth/admin`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }),
            invalidatesTags: ["User"],
        }),
        userPage: build.mutation({
            query: () => ({
                url: `auth/user`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const {
    useRegisterMutation,
    useIsVerifyMutation,
    useLoginMutation,
    useAdminPageMutation,
    useProfilePageMutation,
    useUserPageMutation
} = userApiSlice;
