import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
import { Task } from '../model/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: Http) { }
  
    fetchTasks(): Promise<any>{
      return this.http.get('http://localhost:8089/ProjectManagemetService/projectmanagementtaskapi/tasks').toPromise()
      .then(res=>res.json())
    }

    fetchParentTasks(): Promise<any>{
      return this.http.get('http://localhost:8089/ProjectManagemetService/projectmanagementtaskapi/parentTasks').toPromise()
      .then(res=>res.json())
    }
    
    fetchTask(id: number): Promise<any>{
      return this.http.get('http://localhost:8089/ProjectManagemetService/projectmanagementtaskapi/task/'+id).toPromise()
      .then(res=>res.json())
    }
    updateTask(task:Task){
      return this.http.put('http://localhost:8089/ProjectManagemetService/projectmanagementtaskapi/task', task).toPromise()
    }
  
    addTask(task:Task): Promise<any>{
      return this.http.post('http://localhost:8089/ProjectManagemetService/projectmanagementtaskapi/task', task).toPromise()
    }

    addParentTask(task:Task): Promise<any>{
      return this.http.post('http://localhost:8089/ProjectManagemetService/projectmanagementtaskapi/parentTask', task).toPromise()
    }
  
    deleteTask(index:number): Promise<any>{
      return this.http.delete('http://localhost:8089/ProjectManagemetService/projectmanagementtaskapi/task/'+index).toPromise()
    }
  
    updateTaskStatus(index:number): Promise<any>{
      return this.http.delete('http://localhost:8089/ProjectManagemetService/projectmanagementtaskapi/taskStatus/'+index).toPromise()
    }
}
