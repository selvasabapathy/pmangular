import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material';
import { ProjService } from '../service/proj.service';
import { User } from '../user/user.component';
import { UserService } from '../service/user.service';
import { Project } from '../proj/proj.component';
import { ParentTaskService } from '../service/parent-task.service';

export class ParentTask {
  constructor(public parentTaskId: number, public name: string) {}
}

export class Task {
  constructor(public taskId: number, public parentTaskId: number, public projectId: number, public name: string, public startDate: Date, public endDate: Date, public priority: number, public status: boolean) {}
}

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit {
  addOrUpdateButtonText: string = 'Add';

  project: Project;
  projects: Project[];

  task: Task;
  isParentTask: boolean;

  parentTask: ParentTask;
  parentTasks: ParentTask[];

  userId: number;
  users: User[];

  isStartDateError: boolean;
  isEndDateError: boolean;

  constructor(private projService: ProjService, private parentTaskService: ParentTaskService, private userService: UserService) { }

  ngOnInit() {
    console.log(`TaskAddComponent - ngOnInit`);
    this.refreshFields();
    this.refreshProjects();
    this.refreshParentTasks()
    this.refreshUsers();
  }

  validtateDates() {
    this.isStartDateError = false;
    this.isEndDateError = false;
    if (new Date(this.project.startDate) < new Date()) {
      this.isStartDateError = true;
    }
    if (new Date(this.project.endDate) <= new Date() || new Date(this.project.endDate) < new Date(this.project.startDate)) {
      this.isEndDateError = true;
    }
  }

  pickProjectId() {
    console.log(`Manager UserId: ${this.userId}`);
  }

  isParentTaskFlipped() {
    this.isParentTask != this.isParentTask;
  }

  resetForm() : void {
    console.log(`Reset form...`);
    this.refreshProjects();
  }

  addTask() : void {
    console.log(`Project Manager add/update (Manager (UserID): ${this.userId}):  ${this.project}`);
    if (this.project.projectId === 0) {
      this.projService.addProject(this.userId, this.project).subscribe(
        response => {
          this.refreshProjects();
          this.refreshParentTasks();
          this.refreshUsers();
        }
      )  
    } else {
      console.log(`Edit project: ` + this.project);
      this.addOrUpdateButtonText = 'Add';
      this.projService.editProject(this.userId, this.project).subscribe(
        response => {
          this.refreshProjects();
          this.refreshParentTasks();
          this.refreshUsers();
        }
      )  
    }
  }

  editTask(projectId: number) : void {
    console.log(`Edit project: ${projectId}`);
    this.addOrUpdateButtonText = 'Update';
    this.project = this.projects.find(project => project.projectId === projectId);
    this.userService.retrieveManager(projectId).subscribe(
      response => {
        console.log(`Manager of the projectId ${projectId} is ${response.toString}`);
        if (response.length === 0) {
          console.log(`Manager of the projectId ${projectId} is NONE`);
          this.userId = 0;
        } else {
          // this.managers = response;
          // this.userId = this.managers[0].userId;
        }
      }
    )
  }

  // deleteProject(projectId: number) : void {
  //   console.log(`Delete Project with projectId: ${projectId}`);
  //   this.projService.deleteProject(projectId).subscribe(
  //     response => {
  //       this.refreshProjects();
  //       this.refreshUsers();
  //     }
  //   )
  // }

  refreshFields() : void {
    this.task = new Task(0,0,0,'',new Date(), new Date(), 0, false);
    this.isParentTask = false;
    this.addOrUpdateButtonText = 'Add';
  }

  refreshProjects() : void {
    this.project =  new Project(0,null,0,null, null, 0, false);
    this.projService.retrieveAllProjects().subscribe(
      response => {
        console.log(`Projects from service: ${response}`);
        this.projects = response;
      }
    )
  }

  refreshParentTasks() : void {
    this.parentTask =  new ParentTask(0,null);
    this.parentTaskService.retrieveAllParentTasks().subscribe(
      response => {
        console.log(`ParentTasks from service: ${response}`);
        this.parentTasks = response;
      }
    )
  }

  refreshUsers() : void {
    this.userId = 0;
    // this.managers = null;
    this.userService.retrieveAllUsers().subscribe(
      response => {
        console.log(`Users from service: ${response}`);
        this.users = response;
      }
    )
  }


  // sortProjects(sort: Sort) {
  //   const data = this.projects;
  //   if (!sort.active || sort.direction === '') {
  //     this.projects = data;
  //     return;
  //   }

  //   this.projects = data.sort((a, b) => {
  //     const isAsc = sort.direction === 'asc';
  //     switch (sort.active) {
  //       case 'startDate': return this.compare(a.startDate, b.startDate, isAsc);
  //       case 'endDate': return this.compare(a.endDate, b.endDate, isAsc);
  //       case 'priority': return this.compare(a.priority, b.priority, isAsc);
  //       case 'completed': return this.compare(a.completed, b.completed, isAsc);
  //       default: return 0;
  //     }
  //   });
  // }
  
  // compare(a: boolean | number | string | Date, b: boolean | number | string | Date, isAsc: boolean) {
  //   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  // }

}
