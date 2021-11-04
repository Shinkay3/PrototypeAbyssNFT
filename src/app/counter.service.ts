import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  counter: number = 0;
  public page: string = "navHome";


  constructor() { }

  getNumber(): number
  {
    return this.counter;
  }

  updatePage(asda:string)
  {
    this.page = asda;
  }

  getPage(): string
  {
    return this.page;
  }

  incrementNumber()
  {
    this.counter++;
  }

}
