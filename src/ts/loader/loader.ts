import { Constants } from "../constant/Constants";
import { Application, Assets, Sprite } from 'pixi.js';
import * as fs from "fs";
import * as path from "path";


class Loader {

    private assetsList: any = {};
    public loader: HTMLCollectionOf<Element> = document.getElementsByClassName(Constants.loader);

    public hideLoader(): void {
        const loadingMeter: any = this.loader[0].children[1];
        loadingMeter.textContent = '100%';
        if (loadingMeter.textContent === '100%') {
            (this.loader[0] as HTMLElement).style.display = 'none';
            const canvas: any = document.getElementById('myCanvas');
            (canvas).style.display = 'block';
        }
    };

    public updateLoader(): void {
        const counterDiv: any = document.getElementsByClassName('loading');
        let counter = 0;

        const interval = setInterval(() => {
            if (counterDiv?.length && counter <= 100) {
                counterDiv[0].textContent = `${counter}%`;
                counter++;
            } else {
                clearInterval(interval);
                setTimeout(this.hideLoader.bind(this), (Constants.hideLoaderDelay / 2));
            }
        }, Constants.loadingTickUpTime);
    };

    public startLoading(assetsList?: any): void {
        const baseURL = `${window.location.protocol}//${window.location.hostname}:9000/assets/`;
        const paths: string[] = this.getAllSrc(assetsList);
        paths.forEach((path: string) => {
            const fullURL: string = baseURL + path;
            console.error(fullURL);
            Assets.add({ alias: path, src: fullURL });
            // Assets.load(fullURL);
            const app = (window as any).game.currentGame;
            (window as any).game.cache = Assets.load(path).then(() => {
                this.updateLoader();
            });
        });
        // Assets.load([paths[0], paths[1]]);
    };

    private getAllSrc(assetsList: any): string[] {
        const srcArray: string[] = [];

        // Iterate over each bundle
        for (const bundle of assetsList.bundles) {
            // Iterate over each asset in the current bundle
            for (const asset of bundle.assets) {
                // Add the src value to the array
                srcArray.push(asset.src);
            }
        }

        return srcArray;
    }

}

export default Loader;
