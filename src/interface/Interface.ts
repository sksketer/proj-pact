import { Application } from "pixi.js";
import { Constants } from "../ts/constant/Constants";

export interface IGame {
    currentGame?: Application;
    constants?: typeof Constants;
    assetsCache?: any;
}