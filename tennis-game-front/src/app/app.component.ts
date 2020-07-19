import { Component, OnInit } from '@angular/core';
import { GameServiceService } from './game-service.service';
import { Match } from './model/match';
import { Player } from './model/player';
import { Point } from './model/point.enum';
import {Game} from './model/game'
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'tennis-game-front';
  match : Match;
  p1 : Player;
  p2 : Player;
  winnerplayer : Player = null;
  players : Player[];
  setP1 : number;
  setP2 : number;
  gameP1 : string;
  gameP2 : string;
  games  : Game [];

  textValue1 = 'player 1';
  textValue2 = 'player 2';
  gameOver : boolean =true;


  modalOptions:NgbModalOptions;
  closeResult: string;


  


  constructor(private gameService: GameServiceService,private modalService: NgbModal) {
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
  }
 
  ngOnInit() {
    this.p1=new Player();
    this.p2=new Player();
    this.setP1=0;
    this.setP2=0;
    this.gameP1='0';
    this.gameP2='0';

  }

  startGame() {
    this.p1.playerName=this.textValue1;
    this.p2.playerName=this.textValue2;
    this.gameService.startGame([this.p1,this.p2],data=>
      {
        this.match=data
    if(this.match.scor!=undefined && this.match.scor.gameSet.p1GameSetScore!=undefined){
      this.setP1=this.match.scor.gameSet.p1GameSetScore
    }
    if(this.match.scor!=undefined && this.match.scor.gameSet.p2GameSetScore!=undefined){
      this.setP2=this.match.scor.gameSet.p2GameSetScore
    }
    if(this.match.scor!=undefined && this.match.scor.games!=undefined){
      this.gameP1=this.convertPoint(this.match.scor.games[this.match.scor.games.length-1].p1GameScore)
      this.gameP2=this.convertPoint(this.match.scor.games[this.match.scor.games.length-1].p2GameScore)
    }
    if(this.match.scor!=undefined && this.match.scor.gameSet.setOver!=undefined){
      this.gameOver=this.match.scor.gameSet.setOver
      this.games=this.match.scor.games
      this.winnerplayer=this.match.winnerPlayer
    }
      });      
  }



  addP2Point() {
    this.gameService.addP2Point(this.match.matchID,data=>
      {
        this.match=data;
        if(this.match.scor.gameSet.p1GameSetScore!=undefined){
          this.setP1=this.match.scor.gameSet.p1GameSetScore
        }
        if(this.match.scor.gameSet.p2GameSetScore!=undefined){
          this.setP2=this.match.scor.gameSet.p2GameSetScore
        }    
        if(this.match.scor.games!=undefined){
          this.gameP1=this.convertPoint(this.match.scor.games[this.match.scor.games.length-1].p1GameScore)
          this.gameP2=this.convertPoint(this.match.scor.games[this.match.scor.games.length-1].p2GameScore)
        }
        if(this.match.scor!=undefined && this.match.scor.gameSet.setOver!=undefined){
          this.gameOver=this.match.scor.gameSet.setOver
          this.games=this.match.scor.games
          this.winnerplayer=this.match.winnerPlayer
        }
      });
  }


  addP1Point() {
    this.gameService.addP1Point(this.match.matchID,data=>
      {
        this.match=data;
        if(this.match.scor.gameSet.p1GameSetScore!=undefined){
          this.setP1=this.match.scor.gameSet.p1GameSetScore
        }
        if(this.match.scor.gameSet.p2GameSetScore!=undefined){
          this.setP2=this.match.scor.gameSet.p2GameSetScore
        }    
        if(this.match.scor.games!=undefined){
          this.gameP1=this.convertPoint(this.match.scor.games[this.match.scor.games.length-1].p1GameScore)
          this.gameP2=this.convertPoint(this.match.scor.games[this.match.scor.games.length-1].p2GameScore)
        }
        if(this.match.scor!=undefined && this.match.scor.gameSet.setOver!=undefined){
          this.gameOver=this.match.scor.gameSet.setOver
          this.games=this.match.scor.games
          this.winnerplayer=this.match.winnerPlayer
        }
      });
  }




   convertPoint( p:Point): string {
     if (p.toString()=='ZERO'){
       return '0'
     } else if (p.toString()=='FIFTEEN'){
      return '15'
    } else if (p.toString()=='THIRTY'){
      return '30'
    } else if (p.toString()=='FORTY'){
      return '40'
    } else if (p.toString()=='ADVANTAGE'){
      return 'AD'
    } else if (p.toString()=='WIN'){
      return 'WIN'
    } else return '0'

}


open(content) {
  this.modalService.open(content, this.modalOptions).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
    
  } else {
    return  `with: ${reason}`;
  }
}


}
