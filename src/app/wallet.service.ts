import { Injectable } from '@angular/core';
import * as waxjs from "@waxio/waxjs/dist";

@Injectable({
  providedIn: 'root'
})
export class WalletService {

   wax:waxjs.WaxJS=new waxjs.WaxJS({rpcEndpoint: "https://wax.greymass.com",
  //wax:waxjs.WaxJS=new waxjs.WaxJS({rpcEndpoint: "https://testnet.waxsweden.org",
  
  tryAutoLogin: true
  });
  userAccount:any;
  pubKeys:any;

  constructor() { }

  async addWaxWallet(): Promise<any>
  {
    this.userAccount = await this.wax.login();
    this.pubKeys = this.wax.pubKeys;
    console.log(this.userAccount, this.pubKeys);
    return this.userAccount;
  }
}
