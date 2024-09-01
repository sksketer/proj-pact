import { Application, Assets, Sprite } from 'pixi.js';
import '../styles/style.less';
import { Constants } from './constant/constants';
import updateLoader from './loader/loader';

const msg: string = 'I Like you, shruti!';
console.log(msg);

setTimeout(updateLoader, Constants.hideLoaderDelay);
