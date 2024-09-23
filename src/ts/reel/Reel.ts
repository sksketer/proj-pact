import { Application, Container, Renderer, Sprite } from "pixi.js";
import { IGame, IReelConfig } from "../interface/Interface";
import { CreateElement } from "../view/CreateElement";

export class Reel extends Container {

    private reelId: number;
    private isSpinning: boolean;
    private reelConfig: IReelConfig = undefined as any as IReelConfig;
    private symArr: Array<Sprite>;
    private ce: CreateElement;

    constructor(config: IReelConfig, grid: Array<number>) {
        super();
        this.reelId = config.id;
        this.isSpinning = false;
        this.reelConfig = config;
        this.symArr = [];
        this.ce = new CreateElement();
        this.x = config.x;

        this.setReel(grid);
        this.update();
    }

    public setReel(grid: Array<number>): void {
        while (this.children.length) {
            this.children.pop()?.destroy();
        }
        this.symArr = [];

        const reelGrid: Array<number> = [...grid];

        reelGrid.unshift(this.getRandomSymbolID());
        reelGrid.push(this.getRandomSymbolID());

        reelGrid.forEach((id: number, index: number) => {
            const sym: Sprite = this.ce.createSymbol({ x: 0, y: 0, texture: "", parent: this });
            sym.y = this.reelConfig.symbolHeight * (index - 1);
            this.symArr.push(sym);
        });
    }

    private getRandomSymbolID(): number {
        return this.reelConfig.reelSet[Math.floor(Math.random() * this.reelConfig.reelSet.length)];
    }

    public startSpin(): void {
        this.isSpinning = true;
    }

    public stopSpin(stopGrid: Array<number>): void {
        this.isSpinning = false;
        stopGrid && this.setReel(stopGrid);
    }

    private update(): void {
        (((window as any).game as IGame).currentGame as Application<Renderer>).ticker.add((time) => {
            if (this.isSpinning) {
                (this.children as Array<Sprite>).forEach((sym: Sprite) => {
                    sym.y += 20;
                    if (sym.y > 400) {
                        sym.y = 0;
                    }
                });
            }
        });
    }
}