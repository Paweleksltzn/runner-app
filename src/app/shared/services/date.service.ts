import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  public createDateString(currentDate: Date) {
    const days = currentDate.getDate() < 10 ? `0${currentDate.getDate()}` : currentDate.getDate();
    const month =  currentDate.getMonth() + 1 < 10 ? `0${currentDate.getMonth() + 1}` : currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    return `${days}.${month}.${year}`;
  }

}
