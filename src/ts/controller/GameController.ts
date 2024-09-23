import { Application, Container, Renderer, Sprite } from "pixi.js";
import { GameView } from "../view/GameView";
import { IGame } from "../interface/Interface";
import { Reel } from "../reel/Reel";

export class GameController {
    private gameView: GameView;
    private spinButton: Sprite = undefined as any as Sprite;
    private reelsContainer: Container = undefined as any as Container;
    private isSpinning: boolean = false;

    constructor(gameView: GameView) {
        this.gameView = gameView;
        this.initializeElement();
        this.bindHandler();
    }

    private initializeElement(): void {
        this.spinButton = this.gameView.getElement('spinBtn') as Sprite;
        this.reelsContainer = this.gameView.getElement('reelsContainer') as Container;
    }

    private bindHandler(): void {
        this.spinButton.interactive = true;
        this.spinButton.eventMode = 'static';
        this.spinButton.cursor = 'pointer';
        this.spinButton.on('pointerdown', this.startSpin.bind(this, this.spinButton));
    }

    private startSpin(spinButton: Sprite): void {
        console.log("Spin button clicked");
        // spinButton.interactive = false;
        this.isSpinning = true;

        [...(this.reelsContainer.children as Array<Reel>).slice(0, -1)].forEach((reel: Reel, i: number) => {
            setTimeout(reel.startSpin.bind(reel), 50 * (i + 1));
            setTimeout(reel.stopSpin.bind(reel, [0, 0, 0]), 1000 * (i + 2));
        });

    }

    private stopSpin(): void {
        console.log("spin stopped");
        this.isSpinning = false;
        this.spinButton.interactive = true;
    }
}