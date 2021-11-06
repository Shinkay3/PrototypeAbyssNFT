import { Injectable } from '@angular/core';
import * as waxjs from "@waxio/waxjs/dist";

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  wax:waxjs.WaxJS;

  constructor() { }

  async addWaxWallet()
  {
    this.wax=new waxjs.WaxJS({rpcEndpoint: "https://wax.greymass.com",
    tryAutoLogin: false
    });

    await this.wax.login();
    console.log(this.wax);
  }
}
