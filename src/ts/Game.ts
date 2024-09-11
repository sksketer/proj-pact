import { assetsList } from "../manifest/assetsList";
import Loader from "./loader/loader";

export class Game {
    constructor() {

        this.openGame();
        this.startLoading();
        
    }

    private openGame(): void {}

    private startLoading(): void {
        const loader = new Loader();
        loader.startLoading(assetsList);
    }
}