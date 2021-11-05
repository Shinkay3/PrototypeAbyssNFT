import { Component, OnInit } from '@angular/core';
import * as waxjs from "@waxio/waxjs/dist";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }
  wax:waxjs.WaxJS;

  ngOnInit(): void {
  }

  async loginWax()
  {
    this.wax=new waxjs.WaxJS({rpcEndpoint: "https://wax.greymass.com",
    tryAutoLogin: false
    });

    await this.wax.login();
    console.log(this.wax);
  }


}
