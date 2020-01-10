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

  constructor(private projService: ProjService, private userService: UserService) { }

  ngOnInit() {
    console.log(`ProjComponent - ngOnInit`);
    this.refreshProjects();
    this.userService.retrieveAllUsers().subscribe(
      response => {
        console.log(`Users from service: ${response}`);
        this.users = response;
      }
    )
  }

  addProject() : void {
    console.log(`Add project: ` + this.project);
    if (this.project.projectId === 0) {
      this.projService.addProject(this.project).subscribe(
        response => {
          this.refreshProjects();
        }
      )  
    } else {
      console.log(`Edit project: ` + this.project);
      this.addOrUpdateButtonText = 'Add';
      this.projService.editProject(this.project.projectId, this.project).subscribe(
        response => {
          this.refreshProjects();
        }
      )  
    }
  }

  editProject(projectId: number) : void {
    console.log(`Edit project: ${projectId}`);
    this.addOrUpdateButtonText = 'Update';
    this.project = this.projects.find(project => project.projectId === projectId);
  }

  deleteProject(projectId: number) : void {
    console.log(`Delete Project with projectId: ${projectId}`);
    this.projService.deleteProject(projectId).subscribe(
      response => {
        this.refreshProjects();
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
