import { Application, Assets } from 'pixi.js';
import { CanvasConstants, Constants } from './constant/Constants';
import { Game as MainGame } from './Game';
import { IGame } from './interface/Interface';
import '../styles/style.less';
import { GameModel } from './parser/GameModel';

const msg: string = 'I Like you, shruti!';
console.warn(msg);

/** ----------------------------------- */

// add game on window object
declare global {
    interface Window {
        game: IGame;
    }
}
// store Game reference in Global game object
let Game: IGame = {};
(window as any).game = Game;
(window as any).game.model = new GameModel();;

/** The PixiJS app Application instance, shared across the project */
const app = new Application();
(globalThis as any).__PIXI_APP__ = app;

const init = async () => {

    const extraOffset: number = 5;
    const width: number = (window.innerWidth || Number(CanvasConstants.canvasWidth)) - extraOffset;
    const height: number = (window.innerHeight || Number(CanvasConstants.canvasHeight)) - extraOffset;

    await app.init({ width, height, background: '#1099bb' }).then((res: any) => {
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