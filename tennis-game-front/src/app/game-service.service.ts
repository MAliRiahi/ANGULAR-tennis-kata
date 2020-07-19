import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Player } from './model/player';
import { Match } from './model/match';



@Injectable({
  providedIn: 'root'
})
export class GameServiceService {
  private url:string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8081/tennis';
  }

  public startGame(players:Player[],callback) {
    let resp =   this.http.post<Match>(this.url+'/newMatch', players);
    resp.subscribe(data=>
      {
        callback(data);
      })
  }

  public addP1Point(matchId:number,callback) {
    let resp =  this.http.post<Match>(this.url+'/addP1Point', matchId);
    resp.subscribe(data=>
      {
        callback(data);
      })
  }

  public addP2Point(matchId:number,callback) {
    let resp =  this.http.post<Match>(this.url+'/addP2Point', matchId);
    resp.subscribe(data=>
      {
        callback(data);
      })
  }

 
}
