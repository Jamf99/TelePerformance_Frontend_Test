import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'underscore';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: Array<string>): Array<string> {
    if(!value) return [];
    return _.sortBy(value, function(dog){ return dog; });
  }

}
