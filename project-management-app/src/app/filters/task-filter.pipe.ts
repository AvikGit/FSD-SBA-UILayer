import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../model/Task';

@Pipe({
  name: 'taskFilter'
})
export class TaskFilterPipe implements PipeTransform {

  d:Date
  transform(tasks: Array<Task>, projectIdTaskSearch: number){
    if (tasks && tasks.length){
        return tasks.filter(task =>{
            if (projectIdTaskSearch && task.projectId == projectIdTaskSearch == false){
                return false;
            }
            return true;
       })
    }
    else{
        return tasks;
    }
  }

}
