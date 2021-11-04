import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  activePage: string = "Home";

  constructor() { }

  updatePage(pageName:string)
  {
    this.activePage = pageName;
  }

  getPage(): string
  {
    return this.activePage;
  }

}
