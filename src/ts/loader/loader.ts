import { Constants } from "../constant/Constants";
import { Application, Assets, Sprite } from 'pixi.js';


const loader: HTMLCollectionOf<Element> = document.getElementsByClassName(Constants.loader);

const hideLoader = () => {
    const loadingMeter: any = loader[0].children[1];
    loadingMeter.textContent = '100%';
    if (loadingMeter.textContent === '100%') {
        (loader[0] as HTMLElement).style.display = 'none';
        const canvas: any = document.getElementById('myCanvas');
        (canvas).style.display = 'block';
    }
};

const updateLoader = () => {
    const counterDiv: any = document.getElementsByClassName('loading');
    let counter = 0;

    const interval = setInterval(() => {
        if (counterDiv?.length && counter <= 100) {
            counterDiv[0].textContent = `${counter}%`;
            counter++;
        } else {
            clearInterval(interval);
            setTimeout(hideLoader, (Constants.hideLoaderDelay / 2));
        }
    }, Constants.loadingTickUpTime);
};

export default updateLoader;
