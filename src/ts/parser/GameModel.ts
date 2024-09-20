import { IGameConfig } from "../interface/Interface";

export class GameModel {

    protected gameConfig: IGameConfig = undefined as any as IGameConfig;

    public setGameConfig(config: IGameConfig): void {
        this.gameConfig = config;
    }

    public getGameConfig(): IGameConfig {
        return this.gameConfig;
    }
}