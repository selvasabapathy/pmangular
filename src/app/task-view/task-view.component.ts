import { Component, OnInit } from '@angular/core';
import {Sort} from '@angular/material';

import { Task, ParentTask } from '../task-add/task-add.component';
import { TaskService } from '../service/task.service';
import { Project } from '../proj/proj.component';
import { ProjService } from '../service/proj.service';
import { ParentTaskService } from '../service/parent-task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {

  projectId: number;
  project: Project;
  projects: Project[];

  parentTaskId: number;
  parentTask: ParentTask;
  parentTasks: ParentTask[];

  taskId: number;
  task: Task;
  tasks: Task[];

  constructor(private projService: ProjService, private parentTaskService: ParentTaskService, private taskService: TaskService) { }

  ngOnInit() {
    this.refreshProjects();
    this.refreshParentTasks();
  }

  pickProjectId() : void {
    console.log(`pickProjectId: ${this.projectId}`);
    this.refreshTasks();
  }

  editTask(taskId: number) : void {
    console.log(`Edit Task with TaskID: ${taskId}`);
  }

  endTask(taskId: number) : void {
    this.task = this.tasks.find(task => task.taskId === taskId);
    console.log(`End Task with TaskID: ${taskId} & Task: ${this.task}`);
    this.task.endDate = new Date();
    this.taskService.editTask(taskId, this.task).subscribe(
      response => {
        this.refreshTasks();
      }
    )
  }

  refreshProjects() : void {
    this.projectId = 0;
    this.project =  new Project(0,null,0,null, null, 0, false);
    this.projService.retrieveAllProjects().subscribe(
      response => {
        console.log(`Projects from service: ${response}`);
        this.projects = response;
      }
    )
  }

  refreshParentTasks() : void {
    this.parentTaskId = 0;
    this.parentTask =  new ParentTask(0,null);
    this.parentTaskService.retrieveAllParentTasks().subscribe(
      response => {
        console.log(`ParentTasks from service: ${response}`);
        this.parentTasks = response;
      }
    )
  }

  refreshTasks() : void {
    this.taskId = 0;
    this.task =  new Task(0,0,0,0,'',new Date(),new Date(),0,false);
    this.taskService.retrieveAllTasks(this.projectId).subscribe(
      response => {
        console.log(`Tasks from service: ${response}`);
        this.tasks = response;
      }
    )
  }

  sortTasks(sort: Sort) {
    const data = this.tasks;
    if (!sort.active || sort.direction === '') {
      this.tasks = data;
      return;
    }

    this.tasks = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'taskName': return this.compare(a.name, b.name, isAsc);
        case 'priority': return this.compare(a.priority, b.priority, isAsc);
        case 'startDate': return this.compare(a.startDate, b.startDate, isAsc);
        case 'endDate': return this.compare(a.endDate, b.endDate, isAsc);
        default: return 0;
      }
    });
  }
  
  compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

}
