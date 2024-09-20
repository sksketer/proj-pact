import { assetsList } from "../manifest/assetsList";
import Loader from "./loader/loader";
import { GameView } from "./view/GameView";

export class Game {
    constructor() {
        this.openGame(); 
        this.handler();       
    }

    private openGame(): void {
        console.log("open game request send from here...");
    }

    private handler(): void {
        console.log("handler request send from here...");
        addEventListener("loadingDone", (data: any) => {
            new GameView(data.detail);
        });
    }

    public startLoading(): void {
        const loader = new Loader();
        loader.startLoading(assetsList);
    }
}