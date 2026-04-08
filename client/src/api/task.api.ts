import axios from "axios";

const taskApi = axios.create({
  baseURL: 'http://localhost:8000/nutri_api/'
})

export type TaskPayload = {
  title: string;
  description: string;
  done?: boolean;
};

export const getTasks = () => {

  
  return taskApi.get('task/');
};

export const getTask = (id: string | number) => {

  
  return taskApi.get(`task/${id}`);
};

export const createTasks = (task: TaskPayload) => {

  return taskApi.post('task/', task);

};

export const deleteTask = (id: string | number) => {

  return taskApi.delete(`task/${id}/`);

};

export const updateTask = (id: string | number, task: TaskPayload) => {

  return taskApi.put(`task/${id}/`,task);

};

