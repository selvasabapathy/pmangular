import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ParentTask } from '../task-add/task-add.component';

@Injectable({
  providedIn: 'root'
})
export class ParentTaskService {

  constructor(private httpClient: HttpClient) { }

  addParentTask(parentTask: ParentTask) {
    console.log(`Add parentTask: ${parentTask}`);
    return this.httpClient.post(`http://localhost:8080/parentTasks`, parentTask);
  }

  editParentTask(parentTaskId: number, parentTask: ParentTask) {
    console.log(`Edited parentTask: ${parentTask}`);
    return this.httpClient.put(`http://localhost:8080/parentTasks/{parentTaskId}`, parentTask);
  }

  deleteParentTask(parentTaskId: number) {
    console.log(`Delete parentTask with parentTaskId: ${parentTaskId}`);
    return this.httpClient.delete(`http://localhost:8080/parentTasks/{parentTaskId}`);
  }

  retrieveParentTask(parentTaskId: number) {
    console.log(`Retrive parentTask with parentTaskId: ${parentTaskId}`);
    return this.httpClient.get<ParentTask>(`http://localhost:8080/parentTasks/{parentTasksId}`);
  }

  retrieveAllParentTasks() {
    console.log(`Retrive all parentTasks...`);
    return this.httpClient.get<ParentTask[]>(`http://localhost:8080/parentTasks`);
  }
}
