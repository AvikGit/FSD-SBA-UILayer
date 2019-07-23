import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTaskComponent } from './add-task/add-task.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserService } from './service/users.service';
import { ProjectService } from './service/project.service';
import { TaskService } from './service/task.service';
import { AddProjectComponent } from './add-project/add-project.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { TaskFilterPipe } from './filters/task-filter.pipe';
import { UserFilterPipe } from './filters/user-filter.pipe';
import { ProjectFilterPipe } from './filters/project-filter.pipe';
import { ProjectSortingPipe } from './filters/project-sorting.pipe';

const navigate = [
  {path:"viewTask", component: ViewTaskComponent},
  {path:"addTask", component: AddTaskComponent},
  {path:"addUser", component: AddUserComponent},
  {path:"addProject", component: AddProjectComponent},
  {path:"edit/:id", component: AddTaskComponent},
  {path:"editUser/:userId", component: AddUserComponent},
  {path:"editProject/:projectId", component: AddProjectComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    AddUserComponent,
    AddProjectComponent,
    ViewTaskComponent,
    TaskFilterPipe,
    UserFilterPipe,
    ProjectFilterPipe,
    ProjectSortingPipe
  ],
  imports: [
    BrowserModule, HttpModule, RouterModule.forRoot(navigate), FormsModule, ReactiveFormsModule
  ],
  providers: [UserService, ProjectService, TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
