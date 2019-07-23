import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectService } from '../service/project.service';
import { UserService } from '../service/users.service';
import {ActivatedRoute} from "@angular/router";
import { Project } from '../model/Project';
import { Users } from '../model/Users';
import * as moment from 'moment';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  myForm: FormGroup
  message:string = ''
  alertClass: string = "alert alert-success"
  projects: Array<Project> = []
  users: Array<Users> = []
  todayTime: Date = new Date();
  editButtonCheck: boolean = false;
  
  constructor(private projectService: ProjectService, private userService: UserService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe( params => {
      if(params.projectId){
        this.fetchProject(params.projectId) 
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

  fetchProject(id: number){
    this.projectService.fetchProject(id)
    .then(data => {
      console.log(data);
      this.myForm.controls['projectId'].setValue(data.projectId)
      this.myForm.controls['project'].setValue(data.project);
      this.myForm.controls['priority'].setValue( data.priority);
      this.myForm.controls['stStartDate'].setValue( data.stStartDate);
      this.myForm.controls['stEndDate'].setValue( data.stEndDate);
      this.myForm.controls['userId'].setValue( data.userId);
    })
    this.editButtonCheck = true;
  }

  ngOnInit() {
    this.fetchProjects();
    this.fetchUsers();
    this.myForm = new FormGroup({  
      'projectId': new FormControl(''),   
      'project': new FormControl('',Validators.required),  
      'stStartDate': new FormControl('', Validators.required),
      'stEndDate': new FormControl('', Validators.required),
      'priority': new FormControl(0, Validators.required),
      'userId': new FormControl('', Validators.required),
      'taskCount': new FormControl(0),
      'completedTaskCount': new FormControl(0),
      'dateCheck': new FormControl(true)
})

this.myForm.statusChanges.subscribe((data: any) => console.log(data));

  }

  onSubmit() {
    console.log("myForm--> " + this.myForm);
    var checkdate = this.checkDates();
    if(checkdate) {
      if(this.myForm.controls['dateCheck'].value == null ||
          this.myForm.controls['dateCheck'].value == false){
        this.myForm.controls['stStartDate'].enable();
        this.myForm.controls['stEndDate'].enable();
        this.myForm.controls['stStartDate'].setValue(this.getFormattedStartDate());
        this.myForm.controls['stEndDate'].setValue(this.getFormattedEndDate());
      }
      console.log("myForm.value--> ", this.myForm.value);
      this.projectService.addProject(this.myForm.value)
      .then((res) => {
        console.log(res.status)
        if(res.status == 201){
          this.alertClass = "alert alert-success"
          this.message = "Project added successfully!!"
          this.fetchProjects();
          this.resetProject()
        }
      })
      .catch((res) =>{
        console.log(res.status)
        if(res.status == 409){
          this.alertClass = "alert alert-danger"
          this.message = "Project addition failed!!"
        }
        if(res.status == 417){
          this.alertClass = "alert alert-danger"
          this.message = "Project addition failed!!"
        }
      })
      
    } else {
      this.alertClass = "alert alert-danger"
      this.message = "Start Date must be less than End Date!"
    }
}

updateProject() {
  this.projectService.updateProject(this.myForm.value)
  .then((res) => {
    console.log(res.status)
    if(res.status == 201){
      this.alertClass = "alert alert-success"
      this.message = "Project updated successfully!!"
      this.fetchProjects();
      this.resetProject();
    }
    if(res.status == 202){
      this.alertClass = "alert alert-success"
      this.message = "Project updated successfully!!"
      this.fetchProjects();
      this.resetProject();
    }
  })
}

deleteProject(index: number){
  this.projectService.deleteProject(index)
  .then((data)=>{
    console.log(data)
  })
  .catch((data)=>{
    if(data.status == 410){
      this.alertClass = "alert alert-success"
      this.message = "Project disabled successfully!!"
      this.fetchProjects();
    } 
    else {
      this.alertClass = "alert alert-danger"
      this.message = "Failed!!"
      console.log(data)
    }});
}


  resetProject() {
    this.myForm.reset();
    this.myForm.controls['projectId'].setValue('');
    this.myForm.controls['project'].setValue('');
    this.myForm.controls['priority'].setValue(0);
    this.myForm.controls['stStartDate'].setValue('');
    this.myForm.controls['stEndDate'].setValue('');
    this.myForm.controls['userId'].setValue('');
    this.myForm.controls['dateCheck'].setValue(true);
  }

  enableDisableDateFields(){
    if(this.myForm.controls['dateCheck'].value == true){
      this.myForm.controls['stStartDate'].enable();
      this.myForm.controls['stEndDate'].enable();
      this.myForm.controls['stStartDate'].setValue('');
      this.myForm.controls['stEndDate'].setValue('');
    } else {
      this.myForm.controls['stStartDate'].disable();
      this.myForm.controls['stEndDate'].disable();
      this.myForm.controls['stStartDate'].setValue(this.getFormattedStartDate());
      this.myForm.controls['stEndDate'].setValue(this.getFormattedEndDate());
  
    }
  }
  
  getFormattedStartDate() {
    this.todayTime = new Date();
    return moment(this.todayTime).format("YYYY-MM-DD");
  }
  getFormattedEndDate() {
    this.todayTime = new Date();
    var tomorrowTime = new Date();
    tomorrowTime.setDate(this.todayTime.getDate() + 1)
    return moment(tomorrowTime).format("YYYY-MM-DD");
  }

  checkDates() {
    var startDate = moment(this.myForm.controls['stStartDate'].value);
    var endDate = moment(this.myForm.controls['stEndDate'].value);
    if(startDate.isSameOrAfter(endDate)){
      return false;
    } else {
      return true;
    }
  }

}
