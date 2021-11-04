import { Component, OnInit } from '@angular/core';
import { CounterService } from '../counter.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  count: number = 0;
  counterservice:CounterService = new CounterService();
  

  constructor() 
  {
  }

  ngOnInit(): void {
    this.count = this.counterservice.getNumber();
  }

  buttonClicked(){
    this.counterservice.incrementNumber();
    this.count = this.counterservice.getNumber();

    //this.count++;
    console.log(this.count);

  }





}



