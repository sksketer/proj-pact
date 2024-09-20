import { Constants } from "../constant/Constants";
import { Assets } from 'pixi.js';

class Loader {

    private assetsList: any = {};
    public loader: HTMLCollectionOf<Element> = document.getElementsByClassName(Constants.loader);
    private loadedAssets: number = 0;

    /** hide the game loader and show the game canvas */
    public hideLoader(): void {
        const loadingMeter: any = this.loader[0].children[1];
        loadingMeter.textContent = `${Constants.HUNDERED}%`;
        if (loadingMeter.textContent === `${Constants.HUNDERED}%`) {
            (this.loader[0] as HTMLElement).style.display = 'none';
        }
    };

    /** update loader percentage */
    public updateLoader(percentage: number): void {
        const counterDiv: any = document.getElementsByClassName('loading');
        console.log("Assets load percentage: ", percentage);

        if (percentage >= 100) {
            this.hideLoader();
        } else {
            counterDiv[0].textContent = `${percentage}%`;
        }
    };

    /** handle game assets loading and update loader */
    public startLoading(assetsList?: any): void {
        const baseURL = `${window.location.protocol}//${window.location.hostname}:9000/assets/`;
        this.assetsList = this.getAllSrc(assetsList);
        const gameAssets: string[] = this.assetsList;
        const numberOfAssets: number = gameAssets.length;

        gameAssets.forEach((path: string) => {
            const fullURL: string = baseURL + path;
            Assets.add({ alias: path, src: fullURL });
            Assets.load(path).then((res) => {
                const loadingPercentage: number = Math.floor(Number(Constants.HUNDERED) / (numberOfAssets - this.loadedAssets++));
                this.updateLoader(loadingPercentage);
                (window as any).game.assetsCache.push(res);
            });
        });
    };

    /** return all assets name w.r.t @param assetsList */
    private getAllSrc(assetsList: any): string[] {
        const srcArray: string[] = [];

        for (const bundle of assetsList.bundles) {
            for (const asset of bundle.assets) {
                srcArray.push(`${bundle.name}/${asset.src}`);
            }
        }

        return srcArray;
    }

}

export default Loader;
