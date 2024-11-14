import { Application, Container, Renderer, Sprite } from "pixi.js";
import { IGame, IReelConfig } from "../interface/Interface";
import { CreateElement } from "../view/CreateElement";
import { SlotSymbol } from "../view/ui/SlotSymbol";

export class Reel extends Container {

    private reelId: number;
    private isSpinning: boolean;
    private reelConfig: IReelConfig = undefined as any as IReelConfig;
    private spinSpeed: number;
    private symArr: Array<SlotSymbol>;
    private ce: CreateElement;

    constructor(config: IReelConfig, grid: Array<number>) {
        super();
        this.reelId = config.id;
        this.isSpinning = false;
        this.reelConfig = config;
        this.spinSpeed = 20;
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
            const sym: SlotSymbol = this.ce.createSymbol({ x: 0, y: 0, id, texture: "", parent: this });
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
        // stopGrid && this.setReel(stopGrid);
    }

    private update(): void {
        (((window as any).game as IGame).currentGame as Application<Renderer>).ticker.add((time) => {
            if (this.isSpinning) {
                this.spin(time.elapsedMS);
            }
        });
    }

    public spin(deltaTime?: any): void {
        (this.children as Array<SlotSymbol>).forEach((sym: SlotSymbol) => {
            // const speed: number = deltaTime < 0 ? deltaTime * this.spinSpeed : this.spinSpeed;
            sym.y += this.spinSpeed;
            if (sym.y > 400) {
                sym.y = 0;
            }
        });
    }
}