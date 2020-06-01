import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstUpper'
})
export class FirstUpperPipe implements PipeTransform {

  transform(value: String, ...args: unknown[]): String {
    return (value) ? value.charAt(0).toUpperCase()+value.substr(1).toLowerCase() : '';
  }

}
