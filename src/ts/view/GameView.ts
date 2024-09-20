import { Container, Sprite } from "pixi.js";
import { CreateElement } from "./CreateElement";
import { IGame } from "../interface/Interface";
import { GameModel } from "../parser/GameModel";

export class GameView {

    private hideLoaderCallback: () => void;
    private ce: CreateElement;

    constructor(callback: () => void) {
        console.log("Hello shruti");
        this.hideLoaderCallback = callback;
        this.ce = new CreateElement();
        this.createScene();
    }

    private createScene(): void {
        const mainContainer: Container = this.ce.createContainer({ name: "gameMainContainer" })
        const background: Sprite = this.ce.createImage({ x: 0, y: 0, name: "background", texture: "_DSC1684", parent: mainContainer, scaleX: 0.23, scaleY: 0.18 });

        const reelContainer: Container = this.ce.createContainer({ name: "reelsContainer", parent: mainContainer });
        const { reels, symbolPerReel } = (((window as any).game as IGame).model as GameModel).getGameConfig();
        const symbolWidth: number = 144;
        const symbolHeight: number = 134;

        for (let i: number = 0; i < reels; i++) {
            const reel: Container = this.ce.createContainer({ name: `reel${i}`, parent: reelContainer });
            reel.x = symbolWidth * i;
            for (let j: number = 0, k: number = -1; j < symbolPerReel + 2; j++, k++) {
                const symbol: Sprite = this.ce.createSymbol({ x: 0, y: 0, texture: "", parent: reel });
                symbol.y = symbolHeight * k;
            }
        }

        const buttonContainer: Container = this.ce.createContainer({ x: 150, y: 530, name: "buttonContainer", parent: mainContainer });
        const spinButton: Sprite = this.ce.createImage({ x: 0, y: 0, name: "spinBtn", texture: "button", parent: buttonContainer, scaleX: 0.15, scaleY: 0.15 });


        this.hideLoaderCallback?.();
    }

    public getElement(elementName: string): Container | Sprite | null {
        const components: Array<Container | Sprite> = this.ce.getAllViewComponents();

        const element = components.find((component: Container | Sprite) => {
            return component.name === elementName;
        });

        return element || null;
    }

}