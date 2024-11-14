import { AnimatedSprite, Container, Sprite } from "pixi.js";
import { CreateElement } from "../CreateElement";
import { ISymbol } from "../UI_Interface";

export class SlotSymbol extends Container {
    private ce: CreateElement;
    private symConfig: ISymbol;
    private symID: number;
    private symStatic: Sprite | undefined;
    private symAnim: AnimatedSprite | undefined;

    constructor(symbolConfig: ISymbol) {
        super();
        this.symID = symbolConfig.id;
        this.label = symbolConfig.name as string || symbolConfig.id.toString();
        (symbolConfig.parent as Container).addChild(this);
        this.symConfig = symbolConfig;
        this.ce = new CreateElement();
        this.setStaticFrame();
        this.setAnimationFrame();
    }

    private setStaticFrame(): void {
        this.symStatic = this.ce.createImage({ name: ``, texture: this.symConfig.texture });
        this.addChild(this.symStatic);
    }

    public getStatcFrame(): Sprite | undefined {
        return this.symStatic;
    }

    private setAnimationFrame(): void {
        // this.symAnim = this.ce.createAnimation({});
        // this.addChild(this.symAnim);
    }

    public getAnimationFrame(): AnimatedSprite | undefined {
        return this.symAnim;
    }
}