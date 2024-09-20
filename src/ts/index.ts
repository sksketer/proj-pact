import { Application, Assets } from 'pixi.js';
import { Constants } from './constant/Constants';
import { Game as MainGame } from './Game';
import { IGame } from './interface/Interface';
import '../styles/style.less';

const msg: string = 'I Like you, shruti!';
console.warn(msg);

/** ----------------------------------- */

// store Game reference in Global game object
let Game: IGame = {};
(window as any).game = Game;

/** The PixiJS app Application instance, shared across the project */
const app = new Application();
(globalThis as any).__PIXI_APP__ = app;

const init = async () => {

    await app.init({ background: '#1099bb', resizeTo: window }).then((res: any) => {
        console.warn('promis resolve: ', res);
        document.body.appendChild(app.canvas);
    });

    Game.currentGame = app;
    Game.constants = Constants;
    Game.assetsCache = [];

    await Assets.init();

    const mainGame = new MainGame();
    mainGame.startLoading();

}

init();