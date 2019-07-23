import { Pipe, PipeTransform } from '@angular/core';
import { Users } from '../model/Users';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {

  transform(users: Array<Users>, userIdSearch: number): any {
    if (users && users.length){
      return users.filter(user =>{
          if (userIdSearch && user.userId == userIdSearch == false){
              return false;
          }
          return true;
     })
    }
    else{
      return users;
    }
  }

}
