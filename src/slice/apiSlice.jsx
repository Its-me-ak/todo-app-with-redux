import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiData = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000"
    }),
    tagTypes: ['Tasks'],
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () => "/tasks",
            transformResponse: (task) => task.reverse(),
            providesTags: ['Tasks']
        }),
        addTask: builder.mutation({
            query: (task) => ({
                url: "/tasks",
                method: "POST",
                body: task
            }),
            invalidatesTags: ['Tasks']
        }),
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Tasks']
        }),
        updateTask: builder.mutation({
            query: ({ id, ...updateTaskk }) => ({
                url: `/tasks/${id}`,
                method: "PATCH",
                body: updateTaskk
            }),
            invalidatesTags: ['Tasks']
        })
    })
})

export const {useGetTasksQuery, useAddTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation} = apiData;
