import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material';
import { ProjService } from '../service/proj.service';
import { User } from '../user/user.component';
import { UserService } from '../service/user.service';

export class Project {
  constructor(public projectId: number, public name: string, public taskCount: number, public startDate: Date, public endDate: Date, public priority: number, public completed: boolean) {}
}

@Component({
  selector: 'app-proj',
  templateUrl: './proj.component.html',
  styleUrls: ['./proj.component.css']
})
export class ProjComponent implements OnInit {
  addOrUpdateButtonText: string = 'Add';

  project: Project;
  projects: Project[];

  userId: number;
  users: User[];

  managers: User[];

  isStartDateError: boolean;
  isEndDateError: boolean;

  constructor(private projService: ProjService, private userService: UserService) { }

  ngOnInit() {
    console.log(`ProjComponent - ngOnInit`);
    this.refreshProjects();
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

  pickManagerUserId() {
    console.log(`Manager UserId: ${this.userId}`);
  }

  resetForm() : void {
    console.log(`Reset form...`);
    this.refreshProjects();
  }

  addProject() : void {
    console.log(`Project Manager add/update (Manager (UserID): ${this.userId}):  ${this.project}`);
    if (this.project.projectId === 0) {
      this.projService.addProject(this.userId, this.project).subscribe(
        response => {
          this.refreshProjects();
          this.refreshUsers();
        }
      )  
    } else {
      console.log(`Edit project: ` + this.project);
      this.addOrUpdateButtonText = 'Add';
      this.projService.editProject(this.userId, this.project).subscribe(
        response => {
          this.refreshProjects();
          this.refreshUsers();
        }
      )  
    }
  }

  editProject(projectId: number) : void {
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
          this.managers = response;
          this.userId = this.managers[0].userId;
        }
      }
    )
  }

  deleteProject(projectId: number) : void {
    console.log(`Delete Project with projectId: ${projectId}`);
    this.projService.deleteProject(projectId).subscribe(
      response => {
        this.refreshProjects();
        this.refreshUsers();
      }
    )
  }

  refreshUsers() : void {
    this.userId = 0;
    this.managers = null;
    this.userService.retrieveAllUsers().subscribe(
      response => {
        console.log(`Users from service: ${response}`);
        this.users = response;
      }
    )
  }

  refreshProjects() : void {
    this.addOrUpdateButtonText = 'Add';
    this.project =  new Project(0,null,0,null, null, 0, false);
    this.projService.retrieveAllProjects().subscribe(
      response => {
        console.log(`Projects from service: ${response}`);
        this.projects = response;
      }
    )
  }

  sortProjects(sort: Sort) {
    const data = this.projects;
    if (!sort.active || sort.direction === '') {
      this.projects = data;
      return;
    }

    this.projects = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'startDate': return this.compare(a.startDate, b.startDate, isAsc);
        case 'endDate': return this.compare(a.endDate, b.endDate, isAsc);
        case 'priority': return this.compare(a.priority, b.priority, isAsc);
        case 'completed': return this.compare(a.completed, b.completed, isAsc);
        default: return 0;
      }
    });
  }
  
  compare(a: boolean | number | string | Date, b: boolean | number | string | Date, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

}
