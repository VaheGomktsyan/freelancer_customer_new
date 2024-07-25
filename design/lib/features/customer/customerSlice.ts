import { ICustomer } from "@/type/type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const customerSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/customer" }),
    reducerPath: "CustomerApi",
    tagTypes: ["Customer"],
    endpoints: (build) => ({
        getCustomers: build.query<any, ICustomer>({
            query: () => ({
                url: ``,
                method: "GET",
            }),
            providesTags: ["Customer"],
        }),
        updateCustomer: build.mutation<void, Pick<ICustomer, any> & Partial<ICustomer>>({
            query: ({ id, ...patch }) => ({
                url: `/${id}`,
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }),
            invalidatesTags: ["Customer"],
        }),
    }),
});
