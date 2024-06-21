import type { DefineComponent } from "vue/dist/vue.js";

export interface macosWindow{
    title: string;
    iconURL: string;
    isMinimized: boolean;
    isRunning: boolean;
    content: DefineComponent;
    size: {
      minwidth: number;
      minheight: number;
      maxwidth: number;
      maxheight: number;
      depth: number;
    };
    x: number;
    y: number;
    backgroundColor?: string;
    headerTextColor?: string;
  }