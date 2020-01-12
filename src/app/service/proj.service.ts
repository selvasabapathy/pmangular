import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../proj/proj.component';

@Injectable({
  providedIn: 'root'
})
export class ProjService {

  constructor(private httpClient: HttpClient) { }

  addProject(managerId: number, project: Project) {
    console.log(`Add project: ${project}`);
    return this.httpClient.post(`http://localhost:8080/projects/${managerId}`, project);
  }

  editProject(managerId: number, project: Project) {
    console.log(`Edited project: ${project}`);
    return this.httpClient.put(`http://localhost:8080/projects/${managerId}`, project);
  }

  deleteProject(projectId: number) {
    console.log(`Delete project with projectId: ${projectId}`);
    return this.httpClient.delete(`http://localhost:8080/projects/${projectId}`);
  }

  retrieveProject(projectId: number) {
    console.log(`Retrive project with projectId: ${projectId}`);
    return this.httpClient.get<Project>(`http://localhost:8080/projects/${projectId}`);
  }

  retrieveAllProjects() {
    console.log(`Retrive all projects...`);
    return this.httpClient.get<Project[]>(`http://localhost:8080/projects`);
  }
}
