import { Application } from "pixi.js";
import { Constants } from "../constant/Constants";

export interface IGame {
    currentGame?: Application;
    constants?: typeof Constants;
    assetsCache?: any;
}