import type { DefineComponent } from "vue/dist/vue.js";

export interface macosWindow{
    title: string;
    iconURL: string;
    isMinimized: boolean;
    isRunning: boolean;
    content: DefineComponent;
    position: {
      x: number;
      y: number;
      width: number;
      height: number;
      depth: number;
    };
  }