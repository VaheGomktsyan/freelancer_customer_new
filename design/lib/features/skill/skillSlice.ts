import { IAddSkill, ISkill, ISkillWork } from "@/type/type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const skillSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
    reducerPath: "SkillApi",
    tagTypes: ["Skill", "Skill-Work"],
    endpoints: (build) => ({
        addSkill: build.mutation<any, IAddSkill>({
            query: (data: IAddSkill) => ({
                url: "skill",
                method: "POST",
                body: data,
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }),
            invalidatesTags: ["Skill"],
        }),
        getSkills: build.query({
            query: () => ({
                url: `skill`,
                method: "GET",
            }),
            providesTags: ["Skill"],
        }),
        getSkillById: build.query<any, number>({
            query: (id:number) => ({
                url: `skill/${id}`,
                method: "GET",
            }),
            providesTags: ["Skill"],
        }),
        updateSkill: build.mutation<void, Pick<ISkill, any> & Partial<ISkill>>({
            query: ({ id, ...patch }:{id:number}) => ({
                url: `skill/${id}`,
                method: "PATCH",
                body: patch,
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }),
            invalidatesTags: ["Skill"],
        }),
        deleteSkill: build.mutation<any, number>({
            query: (id:number) => ({
                url: `skill/${id}`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }),
            invalidatesTags: ["Skill"],
        }),
        addSkillWork: build.mutation<any, ISkillWork>({
            query: (data: ISkillWork) => ({
                url: `skill-work`,
                method: "POST",
                body: data,
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }),
            invalidatesTags: ["Skill-Work"],
        }),
        deleteSkillWork: build.mutation({
            query: ({ skillId, workId }:{ skillId:number, workId:number}) => ({
                url: `skill-work/${skillId}/${  workId}`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }),
            invalidatesTags: ["Skill-Work"],
        }),
    }),
});

export const {
    useGetSkillsQuery,
    useGetSkillByIdQuery,
    useAddSkillMutation,
    useUpdateSkillMutation,
    useDeleteSkillMutation,
} = skillSlice;
