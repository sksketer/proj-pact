import { Container, Sprite } from "pixi.js";

export class CreateElement {

    public _add_(parent: any, child: any): void {
        if (parent) {
            parent.addChild(child);
        } else {
            (window as any).game.currentGame.stage.addChild(child);
        }
    }

    public createImage(props: any): Sprite {
        const image = new Sprite(this.getTexture(props.texture));
        image.position.set(props.x || 0, props.y || 0);
        image.scale.set(props.scaleX || 1, props.scaleY || 1);
        this._add_(props.parent, image);

        return image;
    }

    public createContainer(props: any): Container {
        const container = new Container();
        container.name = props.name;
        this._add_(props.param, container);

        return container;
    }

    public getTexture(textureName: string): any {
        const textures = (window as any).game.assetsCache;
        for(let i=0; i<textures.length; i++) {
            if (textures[i].name === textureName) {
                return textures[i];
            }
        }
    }
}