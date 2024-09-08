import { Application, Assets, Sprite } from 'pixi.js';
import { Constants } from './constant/Constants';
import { Game as MainGame } from './Game';
import { IGame } from '../interface/Interface';
import '../styles/style.less';
import updateLoader from './loader/loader';

const msg: string = 'I Like you, shruti!';
console.log(msg);

/** ----------------------------------- */

// store Game reference in Global game object
let Game: IGame = {};
(window as any).game = Game;

/** The PixiJS app Application instance, shared across the project */
const app = new Application();

const init = async () => {   

    await app.init().then((res: any) => {
        console.warn('promis resolve: ', res);
        document.body.appendChild(app.canvas);
    });
    
    Game.currentGame = app;
    Game.constants = Constants;

    // Setup assets bundles (see assets.ts) and start up loading everything in background
    await Assets.init();

    new MainGame();

}

init();