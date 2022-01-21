import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import * as waxjs from "@waxio/waxjs/dist";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class WalletService {


  constructor(private http: HttpClient,private loginService: LoginService) { }
  wax:waxjs.WaxJS=new waxjs.WaxJS({rpcEndpoint: "https://wax.greymass.com",
  //wax:waxjs.WaxJS=new waxjs.WaxJS({rpcEndpoint: "https://chain.wax.io/",
  //wax:waxjs.WaxJS=new waxjs.WaxJS({rpcEndpoint: "https://testnet.waxsweden.org",
  tryAutoLogin: true
  });
  waxAccount:any;
  pubKeys:any;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  ngOnInit() 
  {
    this.wax = new waxjs.WaxJS({rpcEndpoint: "https://wax.greymass.com",
    userAccount:localStorage.getItem("userAccount"),
    pubKeys:JSON.parse(localStorage.getItem("pubKeys")),
    //wax:waxjs.WaxJS=new waxjs.WaxJS({rpcEndpoint: "https://wax.greymass.com/",
    //wax:waxjs.WaxJS=new waxjs.WaxJS({rpcEndpoint: "https://chain.wax.io/",
    //wax:waxjs.WaxJS=new waxjs.WaxJS({rpcEndpoint: "https://testnet.waxsweden.org",
    tryAutoLogin: true
    });  
  }

  async addWaxAccount():Promise<any>
  {
    await this.wax.login();
    if(this.wax.userAccount)
    {
      return this.http.get<string>("https://localhost:5001/api/WaxWallet/AddWaxWallet?token="+ this.loginService.getToken() + "&walletID="+this.wax.userAccount).toPromise()
    }
  }
  
  async waxLogin(): Promise<any>
  {
    this.waxAccount = await this.wax.login();
    this.pubKeys = this.wax.pubKeys;

    localStorage.setItem("waxAccount",this.waxAccount);
    localStorage.setItem("pubKeys",JSON.stringify(this.pubKeys));
    return this.waxAccount;
  }
}
