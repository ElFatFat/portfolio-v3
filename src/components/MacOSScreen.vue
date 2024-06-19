<script setup lang="ts">
import MacOSTopbar from './MacOSTopbar.vue';
import MacOSTaskbar from './MacOSTaskbar.vue';
import MacOSWindowManager from './MacOSWindowManager.vue';
import { onMounted, type DefineComponent } from 'vue';
import { type macosWindow } from '../interfaces';

  import { ref } from 'vue';
  const maxZIndex = ref(0);

  const macosWindows = ref<macosWindow[]>([
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
    },
    {
      title: "Discord",
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
    },
    {
      title: "Visual Studio Code",
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
    },
    {
      title: "Postman",
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
    },
    {
      title: "Spotify",
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
    },
    {
      title: "Finder",
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
  ]);

  const openApp = (event: Event) => {
    macosWindows.value.forEach(window => {
      // @ts-ignore
      if(window.title === event){
        if(!window.isRunning){
          window.isRunning = true;
        }
        window.isMinimized = false;
      }
    });
  }

  const closeApp = (event: Event) => {
    macosWindows.value.forEach(window => {
      // @ts-ignore
      if(window.title === event){
        window.isRunning = false;
        window.isMinimized = false;
      }
    });
  }

  const minimizeApp = (event: Event) => {
    macosWindows.value.forEach(window => {
      // @ts-ignore
      if(window.title === event){
        window.isMinimized = true;
      }
    });
  }

  const touchApp = (event: Event) => {
    macosWindows.value.forEach(window => {
      // @ts-ignore
      if(window.title === event){
        window.position.depth = maxZIndex.value + 1;
        maxZIndex.value = window.position.depth;
      }
    });
  }
  
</script>

<template>
  <div class="macos-wrapper">
    <div class="macos-main" :style="{'background-image': 'url(/src/assets/wallpapers/01.jpeg)'}">
      <MacOSTopbar/>
      <MacOSWindowManager :macos-window="macosWindows" @close-app="closeApp" @minimize-app="minimizeApp" @touch-app="touchApp"/>
      <MacOSTaskbar :macos-window="macosWindows" @openApp="openApp"/>
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
