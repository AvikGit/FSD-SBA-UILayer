import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../service/users.service';
import {ActivatedRoute} from "@angular/router";
import { Users } from '../model/Users';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  myForm: FormGroup
  message:string = ''
  alertClass: string = "alert alert-success"
  users: Array<Users> = []
  editButtonCheck: boolean = false;
  
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe( params => {
      if(params.userId){
        this.fetchUser(params.userId) 
      }
    });
    

  }

  fetchUsers(){
    this.userService.fetchUsers()
    .then((data)=>{
      this.users = data;
    })
  }

  fetchUser(id: number){
    this.userService.fetchUser(id)
    .then(data => {
      console.log(data);
      this.myForm.controls['userId'].setValue(data.userId)
      this.myForm.controls['firstName'].setValue(data.firstName);
      this.myForm.controls['lastName'].setValue(data.lastName);
      this.myForm.controls['employeeId'].setValue(data.employeeId);
    })
    this.editButtonCheck = true;
  }

  ngOnInit() {
    this.fetchUsers();
    this.myForm = new FormGroup({  
      'userId': new FormControl(''),   
      'firstName': new FormControl('',Validators.required),  
      'lastName': new FormControl('', Validators.required),
      'employeeId': new FormControl('', [Validators.required,Validators.min(100000), Validators.max(999999)])
})

this.myForm.statusChanges.subscribe((data: any) => console.log(data));

  }

  onSubmit() {
    console.log("myForm--> " + this.myForm);
    console.log("myForm.value--> ", this.myForm.value);
    this.userService.addUser(this.myForm.value)
    .then((res) => {
      console.log(res.status)
      if(res.status == 201){
        this.alertClass = "alert alert-success"
        this.message = "User added successfully!!"
        this.fetchUsers();
        this.resetUser();
      }
    })
    .catch((res) =>{
      console.log(res.status)
      if(res.status == 409){
        this.alertClass = "alert alert-danger"
        this.message = "User addition failed!!"
        
      }
      if(res.status == 417){
        this.alertClass = "alert alert-danger"
        this.message = "User addition failed!!"
      }
    })
}

updateUser() {
  this.userService.updateUser(this.myForm.value)
  .then((res) => {
    console.log(res.status)
    if(res.status == 201){
      this.alertClass = "alert alert-success"
      this.message = "User updated successfully!!"
      this.fetchUsers();
      this.resetUser();
    }
    if(res.status == 202){
      this.alertClass = "alert alert-success"
      this.message = "User updated successfully!!"
      this.fetchUsers();
      this.resetUser();
    }
  })
}

deleteUser(index: number){
  this.userService.deleteUser(index)
  .then((data)=>{
    console.log(data)
  })
  .catch((data)=>{
    if(data.status == 410){
      this.alertClass = "alert alert-success"
      this.message = "User removed successfully!!"
      this.fetchUsers();
    } 
    else {
      this.alertClass = "alert alert-danger"
      this.message = "Failed!!"
      console.log(data)
    }});
}

  resetUser() {
    this.myForm.reset();
    this.myForm.controls['userId'].setValue('');
    this.myForm.controls['firstName'].setValue('');
    this.myForm.controls['lastName'].setValue('');
    this.myForm.controls['employeeId'].setValue('');
  }

}
