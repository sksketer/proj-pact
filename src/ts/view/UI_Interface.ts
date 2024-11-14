import { Container } from "pixi.js";

export interface IContainer {
    name: string;
    x?: number;
    y?: number;
    parent?: string | Container;
}

export interface IImage {
    x?: number;
    y?: number;
    name: string;
    texture: string;
    visible?: boolean;
    parent?: Container | string;
    scale?: number;
    scaleX?: number;
    scaleY?: number;
    anchor?: number;
}

export interface ISymbol {
    x?: number;
    y?: number;
    id: number;
    name?: string;
    texture: string;
    parent: Container | string;
}
