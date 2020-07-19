import { Player } from "./player";
import { Scor } from "./scor";


export class Match {
    matchID : number;
    p1 : Player;
    p2 : Player;
    scor : Scor;
    winnerPlayer : Player;
}
