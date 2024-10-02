import { Container, Graphics, Sprite } from "pixi.js";
import { CreateElement } from "./CreateElement";
import { IGame, IGameConfig } from "../interface/Interface";
import { GameModel } from "../parser/GameModel";
import { Reel } from "../reel/Reel";

export class GameView {

    private hideLoaderCallback: () => void;
    private ce: CreateElement;

    constructor(callback: () => void) {
        console.log("Hello shruti");
        this.hideLoaderCallback = callback;
        this.ce = new CreateElement();
        this.createScene();
        addEventListener('resize', this.resize.bind(this));
        this.resize();
    }

    private createScene(): void {
        const gameContainer: Container = this.ce.createContainer({ name: "gameContainer" })
        const background: Sprite = this.ce.createImage({ x: 0, y: 0, name: "background", texture: "gameBG", parent: gameContainer });
        const mainContainer: Container = this.ce.createContainer({ name: "gameMainContainer", parent: gameContainer })

        const reelContainer: Container = this.ce.createContainer({ y: 115, name: "reelsContainer", parent: mainContainer });

        const { reels, symbolPerReel } = (((window as any).game as IGame).model as GameModel).getGameConfig() as IGameConfig;
        const symbolWidth: number = 144;
        const symbolHeight: number = 134;
        
        for (let i: number = 0; i < reels; i++) {
            const reel: Reel = new Reel({ id: i, x: symbolWidth * i, symbolWidth, symbolHeight, reelWidth: symbolWidth, symbolPerReel, reelSet: [] }, [0,0,0])
            reelContainer.addChild(reel);
        }
        
        const reelMask: Graphics = this.ce.createGraphic({x: 0, y: 0, w: symbolWidth * reels, h: symbolHeight * symbolPerReel, parent: reelContainer });
        reelContainer.mask = reelMask;
        
        const buttonContainer: Container = this.ce.createContainer({ x: 150, y: 530, name: "buttonContainer", parent: mainContainer });
        const spinButton: Sprite = this.ce.createImage({ x: 0, y: 0, name: "spinBtn", texture: "spinBtn", parent: buttonContainer, scaleX: 0.15, scaleY: 0.15 });
        const spinBntMask: Graphics = this.ce.createRoundedRectangleGraphic({ x: 7.5, y: 7.7, w: 80, h: 40, radius: 50 , parent: buttonContainer });
        spinButton.mask = spinBntMask;


        this.hideLoaderCallback?.();
    }

    public getElement(elementName: string): Container | Sprite | null {
        const components: Array<Container | Sprite> = this.ce.getAllViewComponents();

        const element = components.find((component: Container | Sprite) => {
            return component.name === elementName;
        });

        return element || null;
    }

    public resize(): void {
        console.log("Game resized");
        const mainContainer: Container = this.getElement('gameMainContainer') as Container;
        const canvasWidth: number = ((window as any).game as IGame).currentGame?.canvas.width as number;
        const canvasHeight: number = ((window as any).game as IGame).currentGame?.canvas.height as number;

        mainContainer.x = (Math.abs(canvasWidth - mainContainer.width))/2;
        // mainContainer.y = (Math.abs(canvasHeight - mainContainer.height))/2;
    }

}