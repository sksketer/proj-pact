import { Application } from "pixi.js";
import { Constants } from "../constant/Constants";
import { GameModel } from "../parser/gameModel";

export interface IGame {
    currentGame?: Application;
    constants?: typeof Constants;
    assetsCache?: any;
    model?: GameModel;
}

export interface IGameConfig {
    grid: string;
    reels: number;
    symbolPerReel: number;
}