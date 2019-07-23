import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskService } from '../service/task.service';
import { ProjectService } from '../service/project.service';
import {ActivatedRoute} from "@angular/router";
import { Project } from '../model/Project';
import { ParentTask } from '../model/ParentTask';
import { Users } from '../model/Users';
import { UserService } from '../service/users.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  myForm: FormGroup
  myParentForm: FormGroup
  message:string = ''
  alertClass: string = "alert alert-success"
  projects: Array<Project> = []
  users: Array<Users> = []
  parentTasks: Array<Users> = []
  editButtonCheck: boolean = false;

  constructor(private taskService: TaskService, private userService: UserService, private projectService: ProjectService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe( params => {
      if(params.id){
        this.fetchTask(params.id) 
      }
    });

  }

  fetchProjects(){
    this.projectService.fetchProjects()
    .then((data)=>{
      this.projects = data;
    })
  }

  fetchUsers(){
    this.userService.fetchUsers()
    .then((data)=>{
      this.users = data;
    })
  }

  fetchParentTasks(){
    this.taskService.fetchParentTasks()
    .then((data)=>{
      this.parentTasks = data;
    })
  }

  fetchTask(id: number){
    this.taskService.fetchTask(id)
    .then(data => {
      console.log(data);
      this.myForm.controls['taskId'].setValue(data.taskId)
      this.myForm.controls['task'].setValue(data.task);
      this.myForm.controls['parentId'].setValue(data.parentId);
      this.myForm.controls['priority'].setValue(data.priority);
      this.myForm.controls['stStartDate'].setValue(data.stStartDate);
      this.myForm.controls['stEndDate'].setValue(data.stEndDate);
      this.myForm.controls['taskStatus'].setValue(data.taskStatus);
      this.myForm.controls['userId'].setValue(data.userId);
      this.myForm.controls['projectId'].setValue(data.projectId);
      this.myForm.controls['parentCheck'].setValue(false);
    })
    this.editButtonCheck = true;
  }


  ngOnInit() {
    this.fetchProjects();
    this.fetchUsers();
    this.fetchParentTasks();
      this.myForm = new FormGroup({  
              'taskId': new FormControl('' ),   
              'taskStatus': new FormControl(1),  
              'task': new FormControl('', Validators.required),
              'parentId': new FormControl('', Validators.required),
              'stStartDate': new FormControl('', Validators.required),
              'stEndDate': new FormControl('', Validators.required),
              'projectId': new FormControl('', Validators.required),
              'priority': new FormControl(0, Validators.required),
              'userId': new FormControl('', Validators.required),
              'parentCheck': new FormControl()
      })

      this.myForm.statusChanges.subscribe((data: any) => console.log(data));

  }
  
  onSubmit() {
      console.log("myForm--> " + this.myForm);
      console.log("myForm.value--> ", this.myForm.value);
      if(this.myForm.controls['parentCheck'].value == false
          || this.myForm.controls['parentCheck'].value == null) {
        this.taskService.addTask(this.myForm.value)
        .then((res) => {
          console.log(res.status)
          if(res.status == 201){
            this.alertClass = "alert alert-success"
            this.message = "Task added successfully!!"
            this.resetTask();
          }
        })
        .catch((res) =>{
          console.log(res.status)
          if(res.status == 409){
            this.alertClass = "alert alert-danger"
            this.message = "Task already exists!!"
          }
        })
      } else {
        this.taskService.addParentTask(this.myForm.value)
        .then((res) => {
          console.log(res.status)
          if(res.status == 201){
            this.alertClass = "alert alert-success"
            this.message = "Parent Task added successfully!!"
            this.resetTask();
          }
        })
        .catch((res) =>{
          console.log(res.status)
          if(res.status == 409){
            this.alertClass = "alert alert-danger"
            this.message = "Parent Task already exists!!"
          }
        })
      }
      
  }
  updateTask() {
      console.log(this.myForm);
      console.log(this.myForm.value);
      this.taskService.updateTask(this.myForm.value)
      .then((res) => {
        console.log(res.status)
        if(res.status == 201){
          this.alertClass = "alert alert-success"
          this.message = "Task added successfully!!"
          this.resetTask();
        }
        if(res.status == 202){
          this.alertClass = "alert alert-success"
          this.message = "Task updated successfully!!"
          this.resetTask();
        }
      })
  }

  resetTask() {
    this.myForm.reset();
    this.myForm.controls['taskId'].setValue('');
    this.myForm.controls['task'].setValue('');
    this.myForm.controls['parentId'].setValue('');
    this.myForm.controls['priority'].setValue(0);
    this.myForm.controls['stStartDate'].setValue('');
    this.myForm.controls['stEndDate'].setValue('');
    this.myForm.controls['userId'].setValue('');
    this.myForm.controls['projectId'].setValue('');
  }

  enableDisableTaskFields() {
    if(this.myForm.controls['parentCheck'].value == true) {
    this.myForm.controls['taskId'].setValue('');
    this.myForm.controls['priority'].setValue(0);
    this.myForm.controls['stStartDate'].setValue('');
    this.myForm.controls['stEndDate'].setValue('');
    this.myForm.controls['userId'].setValue('');
    this.myForm.controls['parentId'].setValue('');
    this.myForm.controls['projectId'].setValue('');
    this.myForm.controls['priority'].disable();
    this.myForm.controls['stStartDate'].disable();
    this.myForm.controls['stEndDate'].disable();
    this.myForm.controls['userId'].disable();
    this.myForm.controls['parentId'].disable();
    this.myForm.controls['projectId'].disable();
    this.myParentForm = new FormGroup({  
      'taskId': new FormControl('' ),   
      'taskStatus': new FormControl(1),  
      'parentId': new FormControl(''),
      'stStartDate': new FormControl(''),
      'stEndDate': new FormControl(''),
      'priority': new FormControl(0),
      'userId': new FormControl(''),
      'parentCheck': new FormControl(true),
      'projectId': new FormControl('')
  
})

    } else {
      this.myForm.controls['priority'].enable();
      this.myForm.controls['stStartDate'].enable();
      this.myForm.controls['stEndDate'].enable();
      this.myForm.controls['userId'].enable();
      this.myForm.controls['parentId'].enable();
      this.myForm.controls['projectId'].enable();
      this.myParentForm = new FormGroup({  
        'taskId': new FormControl('' ),   
        'taskStatus': new FormControl(1),  
        'parentId': new FormControl(''),
        'stStartDate': new FormControl(''),
        'stEndDate': new FormControl(''),
        'priority': new FormControl(0),
        'userId': new FormControl(''),
        'parentCheck': new FormControl(false),
        'projectId': new FormControl('')
    
})
    }
  }

}
