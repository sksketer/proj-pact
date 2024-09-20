import { Application, Container, Renderer, Sprite } from "pixi.js";
import { GameView } from "../view/GameView";
import { IGame } from "../interface/Interface";

export class GameController {
    private gameView: GameView;
    private spinButton: Sprite = undefined as any as Sprite;
    private reelsContainer: Container = undefined as any as Container;
    private isSpinning: boolean = false;

    constructor(gameView: GameView) {
        this.gameView = gameView;
        this.initializeElement();
        this.bindHandler();
        this.update();
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
        spinButton.interactive = false;
        this.isSpinning = true;

        setTimeout(this.stopSpin.bind(this), 2000);
    }

    private stopSpin(): void {
        console.log("spin stopped");
        this.isSpinning = false;
        this.spinButton.interactive = true;
    }

    private update(): void {
        (((window as any).game as IGame).currentGame as Application<Renderer>).ticker.add((time) => {
            if (this.isSpinning) {
                (this.reelsContainer.children as Array<Container>).forEach((reel: Container) => {
                    (reel.children as Array<Sprite>).forEach((sym: Sprite) => {
                        sym.y += 20;
                        if (sym.y > 400) {
                            sym.y = 0;
                        }
                    });
                });
            }
        });
    }
}