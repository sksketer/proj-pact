import { Container, Graphics, Sprite } from "pixi.js";

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

    public createImage(props: any): Sprite {
        const image = new Sprite(this.getTexture(props.texture));
        props.name && (image.label = props.name);
        image.position.set(props.x || 0, props.y || 0);
        image.scale.set(props.scaleX || 1, props.scaleY || 1);
        image.anchor.set(props.anchor || 0);
        this._add_(props.parent, image);

        return image;
    }

    public createSymbol(props: any): Sprite {
        props.texture = this.getSymbolNameByID(props.id);
        return this.createImage(props);
    }

    public createContainer(props: any): Container {
        const container = new Container();
        container.label = props.name;
        container.position.set(props.x || 0, props.y || 0);
        this._add_(props.parent, container);

        return container;
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

        return symbolsArray[randomNumber];
    }

    private randomIntFromInterval(min: number, max: number): number { 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    public getAllViewComponents(): Array<Container | Sprite> {
        return this.viewComponents;
    }

}