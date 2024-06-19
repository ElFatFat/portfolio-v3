<script setup lang="ts">
import MacOSTopbar from './MacOSTopbar.vue';
import MacOSTaskbar from './MacOSTaskbar.vue';
import MacOSWindowManager from './MacOSWindowManager.vue';
import { computed, onMounted, type DefineComponent } from 'vue';
import { type macosWindow } from '../interfaces';
import ChromeApp from './windows/ChromeApp.vue';
import Spotify from './windows/Spotify.vue';

import MacOSLoading from './MacOSLoading.vue';
import MacOSLogin from './MacOSLogin.vue';

  import { ref } from 'vue';
  const maxZIndex = ref(0);
  const loggedIn = ref(false);

const activeApp = computed(() => {
  const maxDepthApp = macosWindows.value.reduce((a, b) => a.size.depth > b.size.depth ? a : b, macosWindows.value[0]);
  return maxDepthApp.size.depth === 0 ? null : maxDepthApp;
});

  const macosWindows = ref<macosWindow[]>([
    {
      title: "Chrome",
      iconURL: "/src/assets/appIcons/chrome.png",
      isMinimized: false,
      isRunning: false,
      // @ts-ignore
      content: ChromeApp,
      size: {
        minwidth: 300,
        maxwidth: 800,
        minheight: 300,
        maxheight: 800,
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
      size: {
        minwidth: 100,
        maxwidth: 800,
        minheight: 100,
        maxheight: 800,
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
      size: {
        minwidth: 100,
        maxwidth: 800,
        minheight: 100,
        maxheight: 800,
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
      size: {
        minwidth: 100,
        maxwidth: 800,
        minheight: 100,
        maxheight: 800,
        depth: 0
      }
    },
    {
      title: "Spotify",
      iconURL: "/src/assets/appIcons/spotify.png",
      isMinimized: false,
      isRunning: false,
      // @ts-ignore
      content: Spotify,
      size: {
        minwidth: 500,
        maxwidth: 1000,
        minheight: 100,
        maxheight: 500,
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
      size: {
        minwidth: 100,
        maxwidth: 800,
        minheight: 100,
        maxheight: 800,
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
        window.size.depth = maxZIndex.value + 1;
        maxZIndex.value = window.size.depth;
      }
    });
  }

  const closeApp = (event: Event) => {
    macosWindows.value.forEach(window => {
      // @ts-ignore
      if(window.title === event){
        window.isRunning = false;
        window.isMinimized = false;
        window.size.depth = 0;
      }
    });
  }

  const minimizeApp = (event: Event) => {
    macosWindows.value.forEach(window => {
      // @ts-ignore
      if(window.title === event){
        window.isMinimized = true;
        window.size.depth = 0;
      }
    });
  }

  const touchApp = (event: Event) => {
    macosWindows.value.forEach(window => {
      // @ts-ignore
      if(window.title === event){
        window.size.depth = maxZIndex.value + 1;
        maxZIndex.value = window.size.depth;
      }
    });
  }
  
  function login(){
    loggedIn.value = true;
  }

  const logOut = () => {
    loggedIn.value = false;
  }
</script>

<template>
  <div class="macos-wrapper">
    <Transition>
      <MacOSLogin v-if="!loggedIn" @login="login"/>
    </Transition>
    <div class="macos-main" :style="{'background-image': 'url(/src/assets/wallpapers/01.jpeg)'}">
      <MacOSTopbar :macos-active-app="activeApp" @close-app="closeApp" @minimize-app="minimizeApp" @logOut="logOut"/>
      <MacOSWindowManager :macos-window="macosWindows" @close-app="closeApp" @minimize-app="minimizeApp" @touch-app="touchApp"/>
      <MacOSTaskbar :macos-window="macosWindows" @openApp="openApp"/>
    </div>
  </div>
</template>

<style scoped>

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: scale(1.5);
}

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
  background-size: center;
  background-repeat: no-repeat;
}
</style>
