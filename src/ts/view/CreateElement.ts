import { AnimatedSprite, Container, Graphics, Sprite } from "pixi.js";
import { SlotSymbol } from "./ui/SlotSymbol";
import { IContainer, IImage, ISymbol } from "./UI_Interface";

export class CreateElement {

    private viewComponents: Array<Container| Sprite> = [];

    public _add_(parent: any, child: any): void {
        if (parent) {
            parent.addChild(child);
        } else {
            (window as any).game.currentGame.stage.addChild(child);
        }
        this.viewComponents.push(child);
    }

    public createImage(props: IImage): Sprite {
        const image = new Sprite(this.getTexture(props.texture));
        props.name && (image.label = props.name);
        image.position.set(props.x || 0, props.y || 0);
        image.scale.set(props.scaleX || 1, props.scaleY || 1);
        image.anchor.set(props.anchor || 0);
        image.visible = props.visible || true;
        this._add_(props.parent, image);

        return image;
    }

    public createSymbol(props: ISymbol): SlotSymbol {
        props.texture = this.getSymbolNameByID(props.id);
        const symbol: SlotSymbol = new SlotSymbol(props);
        return symbol;
    }

    public createContainer(props: IContainer): Container {
        const container = new Container();
        container.label = props.name;
        container.position.set(props.x || 0, props.y || 0);
        this._add_(props.parent, container);

        return container;
    }

    public createAnimation(props: any): AnimatedSprite {
        const animatedSprite: AnimatedSprite = new AnimatedSprite(props.frames);
        this._add_(props.parent, animatedSprite);

        return animatedSprite;
    }

    public createGraphic(props: any): Graphics {
        const { x, y, w, h } = props;
        const graphic = new Graphics();
        graphic.beginFill(0xffffff);
        graphic.drawRect(x, y, w, h);
        graphic.endFill();
        this._add_(props.parent, graphic);

        return graphic;
    }

    public createRoundedRectangleGraphic(props: any): Graphics {
        const { x, y, w, h, radius } = props;
        const graphic = new Graphics();
        graphic.beginFill(0xffffff);
        graphic.drawRoundedRect(x, y, w, h, radius);
        graphic.endFill();
        this._add_(props.parent, graphic);

        return graphic;
    }

    public getTexture(textureName: string): any {
        const textures = (window as any).game.assetsCache;
        for(let i=0; i<textures.length; i++) {
            if (textures[i].name === textureName) {
                return textures[i];
            }
        }
    }

    private getSymbolNameByID(id: number): string {
        const symbolsArray: string[] = ["bonus_game", "Wild_game", "H5_game", "L1_game", "L2_game", "L3_game", "L4_game", "L5_game", "L4_game"];

        const randomNumber: number = this.randomIntFromInterval(0, symbolsArray.length-1);

        return symbolsArray[id | randomNumber];
    }

    private randomIntFromInterval(min: number, max: number): number { 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    public getAllViewComponents(): Array<Container | Sprite> {
        return this.viewComponents;
    }

}