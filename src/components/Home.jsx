import { useState } from "react";
import TaskItem from "./TaskItem";
import { useAddTaskMutation, useDeleteTaskMutation, useGetTasksQuery, useUpdateTaskMutation } from "../slice/apiSlice";

export default function Home() {
    const [newTask, setNewTask] = useState("");

    const { data, isLoading, isError, error } = useGetTasksQuery()
    const [addTask] = useAddTaskMutation()
    const [updateTask] = useUpdateTaskMutation()
    const [deleteTask] = useDeleteTaskMutation()

    // submit the task
    const handleSubmit = (event) => {
        event.preventDefault();
        const task = {
            value: newTask,
            completed: false
        };
        addTask(task)
        setNewTask('');
    }

    return (
        <div className="flex h-screen flex-grow items-start justify-center bg-[#f2f2f1] p-4">
            <div className="task-app w-full max-w-2xl rounded-lg bg-[#f7f7ff] px-0 pb-6 pt-0 text-gray-200 shadow-lg">
                <div className="mb-6 flex items-center justify-center bg-[#5f28a2] rounded-lg rounded-br-none rounded-bl-none p-3 pb-20">
                    <h4 className="ml-3 text-3xl font-bold text-center">My Tasks</h4>
                </div>
                <div className="px-4">
                    <div className="relative bg-white rounded-lg shadow-md px-4 py-10 h-40 -top-20">
                        <form
                            onSubmit={handleSubmit}
                            className="my-2 h-8 flex flex-col items-center gap-5 w-full rounded px-2 text-sm font-medium"
                        >
                            <input
                                className="h-8 py-3 px-2 w-full flex-grow bg-transparent font-medium border-2 border-gray-300 rounded outline-none text-gray-400"
                                type="text"
                                placeholder="Add a new task"
                                onChange={(e) => setNewTask(e.target.value)}
                                value={newTask}
                                required
                            />
                            <button className="w-24 py-1 bg-[#ed6a5a] text-white font-semibold rounded-md shadow-md text-lg">+Add</button>
                        </form>
                    </div>
                    <div className="tasks-container relative bottom-12 overflow-auto bg-white shadow-md rounded-lg pt-2 pb-4">
                        <h2 className="text-gray-900 font-bold text-lg px-3 mb-2 pb-2 border-b border-gray-600">ToDo Lists</h2>
                        {isLoading && (
                            <p className="text-center">Loading...</p>
                        )}
                        {isError && (
                            <p className="text-center">
                                {error.error || "Something went wrong"}
                            </p>
                        )}
                        {data && data.map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                updateTask={updateTask}
                                deleteTask={deleteTask}
                            />
                        ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}