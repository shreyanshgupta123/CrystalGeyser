import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatter'
})
export class DateFormatterPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;

    // Convert the date string to a Date object
    const date = new Date(value);

    // Extract the year, month, and day
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    // Format the date as YYYY-MM-DD
    return `${year}-${month}-${day}`;
  }
}

