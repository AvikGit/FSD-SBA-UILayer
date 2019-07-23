import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../model/Project';

@Pipe({
  name: 'projectFilter'
})
export class ProjectFilterPipe implements PipeTransform {

  transform(projects: Array<Project>, projectIdSearch: number): any {
    if (projects && projects.length){
      return projects.filter(project =>{
          if (projectIdSearch && project.projectId == projectIdSearch == false){
              return false;
          }
          return true;
     })
    }
    else{
      return projects;
    }
  }

}
