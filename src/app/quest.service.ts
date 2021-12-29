import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  DailyQuestFinish(token:string, wallet:string):Promise<string>
  {
    var signature = this.http.get<string>('https://localhost:5001/api/DailyQuest/FinishDailyQuest?token=' + token + "&wallet="+wallet).toPromise();
    return signature;
  }

}
