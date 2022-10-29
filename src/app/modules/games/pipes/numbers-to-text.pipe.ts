import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numbersToText'
})
export class NumbersToTextPipe implements PipeTransform {

  transform(value: number[] | null, ...args: unknown[]): string {
    if (value === null || value === undefined || value.length === 0) {
      return '';
    } else {
      return value.join(', ');
    }
  }

}
