import { Application, Assets, Sprite } from 'pixi.js';
import { Constants } from './constant/Constants';
import { IGame } from '../interface/Interface';
import '../styles/style.less';
import updateLoader from './loader/loader';

const msg: string = 'I Like you, shruti!';
console.log(msg);

/** ----------------------------------- */

// store Game reference in Global game object
let Game: IGame = {};
(window as any).game = Game;

const app = new Application();
await app.init().then((res: any) => {
    console.error('promis resolve: ', res);
    document.body.appendChild(app.canvas);
});

Game.currentGame = app;
Game.constants = Constants;
