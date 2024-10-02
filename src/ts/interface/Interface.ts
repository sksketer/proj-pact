import { Application } from "pixi.js";
import { Constants } from "../constant/Constants";
import { GameModel } from "../parser/GameModel";

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
    defaultBet: number;
}

export interface IReelConfig {
    id: number;
    x: number;
    symbolWidth: number;
    symbolHeight: number;
    reelWidth: number;
    symbolPerReel: number;
    reelSet: Array<number>;
}