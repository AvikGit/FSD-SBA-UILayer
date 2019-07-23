import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
import { Users } from '../model/Users';

@Injectable()
export class UserService {
  constructor(private http: Http) { }

  fetchUsers(): Promise<any>{
    return this.http.get('http://localhost:8089/ProjectManagemetService/projectmanagementuserapi/users').toPromise()
    .then(res=>res.json())
  }
  fetchUser(id: number): Promise<any>{
    return this.http.get('http://localhost:8089/ProjectManagemetService/projectmanagementuserapi/user/'+id).toPromise()
    .then(res=>res.json())
  }
  updateUser(user:Users){
    return this.http.put('http://localhost:8089/ProjectManagemetService/projectmanagementuserapi/user', user).toPromise()
  }

  addUser(user:Users): Promise<any>{
    return this.http.post('http://localhost:8089/ProjectManagemetService/projectmanagementuserapi/user', user).toPromise()
  }

  deleteUser(index:number): Promise<any>{
    return this.http.delete('http://localhost:8089/ProjectManagemetService/projectmanagementuserapi/user/'+index).toPromise()
  }

}
