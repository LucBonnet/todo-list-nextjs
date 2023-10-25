import { apiToken as api } from "@/services/api";
import { TaskType } from "@/types/task";
import useSWR from "swr";

const useTask = () => {

  const fetcher = (url: string) => api.get(url).then((resp) => resp.data);
  const { data, isLoading, mutate } = useSWR<TaskType[]>(`/tasks`, fetcher);

  const deleteTask = async (taskId: string) => {
    await api.delete(`/tasks/${taskId}`);
    mutate();
  }

  const updateTask = async (taskID: string, taskTitle: string) => {
    const resp = await api.put(`/tasks/${taskID}`, { title: taskTitle });
    mutate();
  }

  const toggleTask = async (taskID: string) => {
    await api.put(`/tasks/toggle/${taskID}`);
    mutate();
  }

  const createTask = async (taskTitle: string) => {
    await api.post(`/tasks`, {
      title: taskTitle,
    });
    mutate();
  }

  return {
    data: data ? data : [],
    isLoading,
    mutate,
    toggleTask,
    createTask,
    updateTask,
    deleteTask,
  };
}

export default useTask;