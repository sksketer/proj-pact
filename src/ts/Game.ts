import { assetsList } from "../manifest/assetsList";
import Loader from "./loader/loader";

export class Game {
    constructor() {
        this.openGame();        
    }

    private openGame(): void {
        console.log("open game request send from here...");
    }

    public startLoading(): void {
        const loader = new Loader();
        loader.startLoading(assetsList);
    }
}