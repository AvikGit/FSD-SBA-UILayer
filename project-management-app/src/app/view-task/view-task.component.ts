import { Component, OnInit } from '@angular/core';
import { TaskService } from '../service/task.service';
import { ProjectService } from '../service/project.service';
import {ActivatedRoute} from "@angular/router";
import { Task } from '../model/Task';
import { Project } from '../model/Project';
import * as moment from 'moment';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  tasks: Array<Task> = []
  projects: Array<Project> = []
  message:string = ''
  alertClass: string = "alert alert-success"
  projectModel: string = ''

  constructor(private taskService: TaskService, private projectService: ProjectService) { }

  ngOnInit() {
    this.fetchTasks();
    this.fetchProjectforTasks();
  }

  fetchProjectforTasks(){
    this.projectService.fetchProjects()
    .then((data)=>{
      console.log(data);
      this.projects = data;
    })
  }

  fetchTasks(){
    this.taskService.fetchTasks()
    .then((data)=>{
      console.log(data);

      var dt = moment("2016-01-05").format('MM/DD/YYYY');
      console.log("myForm.value--> ", dt);
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          data[key].stStartDate = moment(data[key].stStartDate).format('MM/DD/YYYY');
          data[key].stEndDate = moment(data[key].stEndDate).format('MM/DD/YYYY');
        }
      }

      this.tasks = data;
    })
  }

  deleteTask(index: number){
    this.taskService.deleteTask(index)
    .then((data)=>{
      console.log(data)
    })
    .catch((err)=>{
      if(err.status == 410){
        this.alertClass = "alert alert-success"
        this.message = "Task deleted successfully!!"
      }
      console.log(err)});
  }

  updateTaskStatus(index: number){
    this.taskService.updateTaskStatus(index)
    .then((data)=>{
      console.log(data)
      if(data.status == 202){
        this.alertClass = "alert alert-success"
        this.message = "Task ended successfully!!"
        this.fetchTasks();
      }
    })
    .catch((err)=>{
        this.alertClass = "alert alert-danger"
        this.message = "Failed!!"
        console.log(err)});
  }

}

