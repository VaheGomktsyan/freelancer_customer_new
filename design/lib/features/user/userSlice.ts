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
        getProfile: build.query({
            query: () => ({
                url: `auth/getProfile`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }),
            providesTags: ["User"],
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
        getUsers: build.query({
            query: () => ({
                url: `user`,
                method: "GET",
            }),
            providesTags: ["User"],
        }),
        getUserById: build.query<any, IUser>({
            query: (id) => ({
                url: `user/${id}`,
                method: "GET",
            }),
            providesTags: ["User"],
        }),
        deleteUserById: build.mutation<any, number>({
            query: (id:number) => ({
                url: `user/${id}`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }),
            invalidatesTags: ["User"],
        }),
        updateUser: build.mutation<void, Pick<IUser, any> & Partial<IUser>>({
            query: ({ id, ...patch }) => ({
                url: `user/updateData`,
                method: "PATCH",
                body: patch,
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }),
            invalidatesTags: ["User"],
        }),
        resetPassword: build.mutation<void, Pick<IUser, any> & Partial<IUser>>({
            query: ({ email, ...patch }) => ({
                url: `user/resetPassword/${email}`,
                method: "PATCH",
                body: patch,
            }),
            invalidatesTags: ["User"],
        }),
        updatePicUrl: build.mutation<void, any>({
            query: (patch:any) => ({
                url: `user/updatePicUrl`,
                method: "PATCH",
                body: patch,
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }),
            invalidatesTags: ["User"],
        }),
        updatePassword: build.mutation<void, Pick<IUser, any> & Partial<IUser>>(
            {
                query: ({ ...patch }) => ({
                    url: `user/updatePassword`,
                    method: "PATCH",
                    body: patch,
                    headers: {
                        Authorization: `Bearer ${localStorage.token}`,
                    },
                }),
                invalidatesTags: ["User"],
            }
        ),
        forgotPassword: build.mutation<void, Pick<IUser, any> & Partial<IUser>>(
            {
                query: ({ email, ...patch }) => ({
                    url: `user/forgetPassword/${email}`,
                    method: "PATCH",
                    body: patch,
                    headers: {
                        Authorization: `Bearer ${localStorage.token}`,
                    },
                }),
                invalidatesTags: ["User"],
            }
        ),
    }),
});

export const {
    useRegisterMutation,
    useIsVerifyMutation,
    useLoginMutation,
    useAdminPageMutation,
    useProfilePageMutation,
    useUserPageMutation,
    useGetUserByIdQuery,
    useGetUsersQuery,
    useDeleteUserByIdMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useUpdatePasswordMutation,
    useUpdatePicUrlMutation,
    useUpdateUserMutation,
    useGetProfileQuery,
} = userApiSlice;
