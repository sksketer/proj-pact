import { assetsList } from "../manifest/assetsList";
import { GameController } from "./controller/GameController";
import { IGame } from "./interface/Interface";
import Loader from "./loader/loader";
import { GameModel } from "./parser/gameModel";
import { GameView } from "./view/GameView";

export class Game {
    constructor() {
        this.openGame(); 
        this.handler();       
    }

    private openGame(): void {
        console.log("open game request send from here...");
        (((window as any).game as IGame).model as GameModel).setGameConfig({
            grid: "3x3", reels: 3, symbolPerReel: 3
        });
    }

    private handler(): void {
        console.log("handler request send from here...");
        addEventListener("loadingDone", (data: any) => {
            const gameView: GameView = new GameView(data.detail);
            new GameController(gameView);
        });
    }

    public startLoading(): void {
        const loader = new Loader();
        loader.startLoading(assetsList);
    }
}