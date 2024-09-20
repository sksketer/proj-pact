import { Container, Sprite } from "pixi.js";
import { CreateElement } from "./CreateElement";

export class GameView {

    private hideLoaderCallback: () => void ;
    private ce: CreateElement;

    constructor(callback: () => void) {
        console.log("Hello shruti");
        this.hideLoaderCallback = callback;
        this.ce = new CreateElement();
        this.createScene();
    }

    private createScene(): void {
        const mainContainer: Container = this.ce.createContainer({ name: "gameMainContainer"})
        const background: Sprite = this.ce.createImage({ x: 0, y: 0, texture: "_DSC1684", parent: mainContainer, scaleX: 0.23, scaleY: 0.18});

        this.hideLoaderCallback?.();
    }
}