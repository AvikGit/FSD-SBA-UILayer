import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'projectSorting'
})
export class ProjectSortingPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
