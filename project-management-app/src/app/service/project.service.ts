import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { Project } from '../model/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: Http) { }
  
    fetchProjects(): Promise<any>{
      return this.http.get('http://localhost:8089/ProjectManagemetService/projectmanagementprojectapi/projects').toPromise()
      .then(res=>res.json())
    }
    fetchProject(id: number): Promise<any>{
      return this.http.get('http://localhost:8089/ProjectManagemetService/projectmanagementprojectapi/project/'+id).toPromise()
      .then(res=>res.json())
    }
    updateProject(project:Project){
      return this.http.put('http://localhost:8089/ProjectManagemetService/projectmanagementprojectapi/project', project).toPromise()
    }
  
    addProject(project:Project): Promise<any>{
      return this.http.post('http://localhost:8089/ProjectManagemetService/projectmanagementprojectapi/project', project).toPromise()
    }
  
    deleteProject(index:number): Promise<any>{
      return this.http.delete('http://localhost:8089/ProjectManagemetService/projectmanagementprojectapi/project/'+index).toPromise()
    }
}
