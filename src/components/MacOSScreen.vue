<script setup lang="ts">
import MacOSTopbar from './MacOSTopbar.vue';
import MacOSTaskbar from './MacOSTaskbar.vue';
import { onMounted, type DefineComponent } from 'vue';
import { type macosWindow } from '../interfaces';

  const macosWindows: macosWindow[] = [
    {
      title: "Chrome",
      iconURL: "/src/assets/appIcons/chrome.png",
      isMinimized: false,
      isRunning: true,
      // @ts-ignore
      content: MacOSTopbar,
      position: {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        depth: 0
      }
    },
    {
      title: "Chrome",
      iconURL: "/src/assets/appIcons/chrome.png",
      isMinimized: false,
      isRunning: true,
      // @ts-ignore
      content: MacOSTopbar,
      position: {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        depth: 0
      }
    },
    {
      title: "Chrome",
      iconURL: "/src/assets/appIcons/chrome.png",
      isMinimized: false,
      isRunning: true,
      // @ts-ignore
      content: MacOSTopbar,
      position: {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        depth: 0
      }
    },
    {
      title: "Chrome",
      iconURL: "/src/assets/appIcons/chrome.png",
      isMinimized: false,
      isRunning: true,
      // @ts-ignore
      content: MacOSTopbar,
      position: {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        depth: 0
      }
    },
    {
      title: "Chrome",
      iconURL: "/src/assets/appIcons/chrome.png",
      isMinimized: false,
      isRunning: true,
      // @ts-ignore
      content: MacOSTopbar,
      position: {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        depth: 0
      }
    },
    {
      title: "Chrome",
      iconURL: "/src/assets/appIcons/chrome.png",
      isMinimized: false,
      isRunning: false,
      // @ts-ignore
      content: MacOSTopbar,
      position: {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        depth: 0
      }
    }
  ]
</script>

<template>
  <div class="macos-wrapper">
    <div class="macos-main" :style="{'background-image': 'url(/src/assets/wallpapers/01.jpeg)'}">
      <MacOSTopbar/>
      <p>Test</p>
      <MacOSTaskbar :macos-window="macosWindows"/>
    </div>
  </div>
</template>

<style scoped>
.macos-wrapper{
  height: 100vh;
  width: 100vw;
  max-height: 100vh;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
}
.macos-main {
  aspect-ratio: 16/9;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: black;
  height: 100%;
  width: 100%;
  max-height: 56.25vw;
  max-width: 100%;
  object-fit: contain;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
