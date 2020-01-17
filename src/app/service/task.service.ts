import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../task-add/task-add.component';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { }

  addTask(task: Task) {
    console.log(`Add task: ${Task}`);
    return this.httpClient.post(`http://localhost:8080/tasks`, task);
  }

  editTask(taskId: number, task: Task) {
    console.log(`Edited task: ${task}`);
    return this.httpClient.put<Task>(`http://localhost:8080/tasks/${taskId}`, task);
  }

  deleteTask(taskId: number) {
    console.log(`Delete task with taskId: ${taskId}`);
    return this.httpClient.delete(`http://localhost:8080/tasks/${taskId}`);
  }

  retrieveTask(projectId: number, taskId: number) {
    console.log(`Retrive task with projectId / taskId: ${projectId} / ${taskId}`);
    return this.httpClient.get<Task>(`http://localhost:8080/tasks/${projectId}/${taskId}`);
  }

  retrieveAllTasks(projectId: number) {
    console.log(`Retrive all tasks... for ProjectID: ${projectId}`);
    return this.httpClient.get<Task[]>(`http://localhost:8080/tasks/${projectId}`);
  }
}
