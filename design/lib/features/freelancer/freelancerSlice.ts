import { IFreelancer } from "@/type/type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { ISkillFreelancer } from "../../../type/type";

export const freelancerSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
    reducerPath: "FreelancerApi",
    tagTypes: ["Freelancer", "Skill-Freelancer"],
    endpoints: (build) => ({
        getFreelancers: build.query<IFreelancer, number>({
            query: () => ({
                url: `freelancer`,
                method: "GET",
            }),
            providesTags: ["Freelancer"],
        }),
        getFreelancerById: build.query<IFreelancer, number>({
            query: (id) => ({
                url: `freelancer/${id}`,
                method: 'GET'
            }),
            providesTags: ["Freelancer"],
        }),
        updateFreelancer: build.mutation<void, Pick<IFreelancer, any> & Partial<IFreelancer>>({
            query: ({ id, ...patch }) => ({
                url: `freelancer/${id}`,
                method: "PATCH",
                body: patch,
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }),
            invalidatesTags: ["Freelancer"],
        }),
        addSkillFreelancer: build.mutation<any, ISkillFreelancer>({
            query: (data: ISkillFreelancer) => ({
                url: 'skill-freelancer',
                method: "POST",
                body: data,
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }),
            invalidatesTags: ["Skill-Freelancer"],
        }),
        deleteSkillFreelancer: build.mutation({
            query: ({ skillId, freelancerId }) => ({
                url: `skill-freelancer/${skillId || freelancerId}`,
            //  ----------------------------------------- ??? ^
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }),
            invalidatesTags: ["Skill-Freelancer"],
        }),
    })
})