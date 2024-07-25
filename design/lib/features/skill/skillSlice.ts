import { ISkill, ISkillWork } from "@/type/type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const skillSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
    reducerPath: "SkillApi",
    tagTypes: ["Skill", 'Skill-Work'],
    endpoints: (build) => ({
        addSkill: build.mutation<any, ISkill>({
            query: (data: ISkill) => ({
                url: "skill",
                method: "POST",
                body: data,
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }),
            invalidatesTags: ["Skill"],
        }),
        getSkills: build.query<ISkill, number>({
            query: () => ({
                url: `skill`,
                method: "GET",
            }),
            providesTags: ["Skill"],
        }),
        getSkillById: build.query<ISkill, number>({
            query: (id) => ({
                url: `skill/${id}`,
                method: "GET",
            }),
            providesTags: ["Skill"],
        }),
        updateSkill: build.mutation<void, Pick<ISkill, any> & Partial<ISkill>>({
            query: ({ id, ...patch }) => ({
                url: `skill/${id}`,
                method: "PATCH",
                body: patch,
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }),
            invalidatesTags: ["Skill"],
        }),
        deleteSkill: build.mutation({
            query: (id) => ({
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
            query: ({ skillId, workId }) => ({
                url: `skill-work/${skillId || workId}`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }),
            invalidatesTags: ["Skill-Work"],
        }),
    })
})