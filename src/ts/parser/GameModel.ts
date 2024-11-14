import { IGameConfig } from "../interface/Interface";

export class GameModel {

    protected gameConfig: IGameConfig = undefined as any as IGameConfig;

    public setGameConfig(config: IGameConfig): void {
        this.gameConfig = config;
    }

    public getGameConfig(property?: string | number): IGameConfig | string | number {
        if (!property) return this.gameConfig;

        return (this.gameConfig as any).property;
    }

    public getReelSet(): Array<Array<number>> {
        return [...Array(3)].map(() =>
            [...Array(5)].map(() => Math.floor(Math.random() * 6))
        );
    }
}