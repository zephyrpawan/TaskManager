import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(tasks: any, fliterString: string, propName: string): any {
    if (tasks.length === 0) {
      return tasks;
    }
    const filteredArray = [];
    for (const task of tasks) {
      if (tasks[propName] === fliterString) {
        filteredArray.push(task);
      }
    }
    return filteredArray;
  }

}
