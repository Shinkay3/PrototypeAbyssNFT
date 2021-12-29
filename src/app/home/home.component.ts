import { Component, ModuleWithComponentFactories, OnInit } from '@angular/core';
import * as waxjs from "@waxio/waxjs/dist";
import { WalletService } from '../wallet.service';
import { QuestService } from '../quest.service';
import { LoginService } from '../login.service';
import {ExplorerApi, RpcApi} from "atomicassets"
import {serialize, deserialize, ObjectSchema} from "atomicassets"



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private walletService:WalletService, private questService:QuestService, private loginService:LoginService) { }

  

  ngOnInit(): void {
  }

  async clearDailyQuest()
  {
    var questData;
    await this.questService.DailyQuestFinish(this.loginService.getToken(),this.walletService.wax.userAccount).then(
      response => questData = response,
      error => "Something went wrong"
    )

    const result = await this.walletService.wax.api.transact({
      actions: [{
        account: 'abyssnftgame',
        name: 'dailyquest',
        authorization: [{
          actor: this.walletService.wax.userAccount,
          permission: 'active',
        }],
        data: {
          from:this.walletService.wax.userAccount,
          sig:questData.signatureInHex,
          data:questData.dataInHex
        },
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 30,
    });

  }

  // async waxTransaction()
  // {
  //   const result = await this.walletService.wax.api.transact({
  //     actions: [{
  //       account: 'alien.worlds',
  //       name: 'transfer',
  //       authorization: [{
  //         actor: this.walletService.wax.userAccount,
  //         permission: 'active',
  //       }],
  //       data: {
  //         from: this.walletService.wax.userAccount,
  //         to: 'vectc.wam',
  //         quantity: '1.0000 TLM',
  //         memo: '',
  //       },
  //     }]
  //   }, {
  //     blocksBehind: 3,
  //     expireSeconds: 1200,
  //   });
  // }

  async mintNFT()
  {
    const result = await this.walletService.wax.api.transact({
      actions: [{
        account: 'abyssnftgame',
        name: 'hi',
        authorization: [{
          actor: this.walletService.wax.userAccount,
          permission: 'active',
        }],
        data: {
          from:this.walletService.wax.userAccount,
          message:'aa'
          // collection:'aa',
          // schema:'qwe',
          // template_id:'qwe'
        },
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 30,
    });
  }


  // async mintNFT()
  // {
  //   const result = await this.walletService.wax.api.transact({
  //     actions: [{
  //       account: 'atomicassets',
  //       name: 'mintasset',
  //       authorization: [{
  //         actor: this.walletService.wax.userAccount,
  //         permission: 'active',
  //       }],
  //       data: {
  //         authorized_minter:'ow1cy.wam',
  //         collection_name: 'test11112222',
  //         schema_name: 'test',
  //         template_id: 343862,
  //         new_asset_owner: 'vectc.wam',
  //         immutable_data: [],
  //         mutable_data: [],
  //         tokens_to_back:[]
  //       },
  //     }]
  //   }, {
  //     blocksBehind: 3,
  //     expireSeconds: 30,
  //   });
  // }

  // async mintNFT()
  // {
      
  //   var api = new ExplorerApi("https://wax.api.atomicassets.io", "atomicassets", {fetch});
  //   var asset = await api.getAsset("1099511627786");

  //   const actions = (await api.action).mintasset(
  //      [{
  //       actor: this.walletService.wax.userAccount,
  //        permission: 'active',
  //     }],"ow1cy.wam", "test11112222", "test", "343862", "ow1cy.wam", {"img": "QmTJMv2Yv1ytDcoaBGq8z5EtfMLDvnjXntb9psNyERcpsQ"}, {"species": "test2"},[""]
  //   );
  
  // }

}
