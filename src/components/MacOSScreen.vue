<script setup lang="ts">
import MacOSTopbar from './MacOSTopbar.vue';
import MacOSTaskbar from './MacOSTaskbar.vue';
import MacOSLoading from './MacOSLoading.vue';
import MacOSWindowManager from './MacOSWindowManager.vue';
import { computed } from 'vue';
import { type macosWindow } from '../interfaces';
import ChromeApp from './windows/ChromeApp.vue';
import Spotify from './windows/Spotify.vue';
import MacOSLogin from './MacOSLogin.vue';

  import { ref } from 'vue';
  const maxZIndex = ref(0);
  const loggedIn = ref(false);
  const loaded = ref(false);

const activeApp = computed(() => {
  const maxDepthApp = macosWindows.value.reduce((a, b) => a.size.depth > b.size.depth ? a : b, macosWindows.value[0]);
  return maxDepthApp.size.depth === 0 ? null : maxDepthApp;
});

  const macosWindows = ref<macosWindow[]>([
    {
      title: "SAE 501",
      iconURL: "/appIcons/jpmeaux.png",
      isMinimized: false,
      isRunning: false,
      // @ts-ignore
      content: ChromeApp,
      size: {
        minwidth: 600,
        maxwidth: 800,
        minheight: 300,
        maxheight: 600,
        depth: 0
      },
      backgroundColor: '#2f2a85',
      headerTextColor: 'white'
    },
    {
      title: "Spotify",
      iconURL: "/appIcons/spotify.png",
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
      },
      backgroundColor: "#1DB954"
    },
    {
      title: "Discord",
      iconURL: "/appIcons/chrome.png",
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
      iconURL: "/appIcons/chrome.png",
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
      iconURL: "/appIcons/chrome.png",
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
      title: "Finder",
      iconURL: "/appIcons/chrome.png",
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
    <Transition name="loading">
      <MacOSLoading v-if="!loaded" @loaded="loaded=true"/>
    </Transition>
    <Transition name="login">
      <MacOSLogin v-if="!loggedIn" @login="login"/>
    </Transition>
    <div class="macos-main" :style="{'background-image': 'url(/wallpapers/01.jpg)'}">
      <MacOSTopbar :macos-active-app="activeApp" @close-app="closeApp" @minimize-app="minimizeApp" @logOut="logOut"/>
      <MacOSWindowManager :macos-window="macosWindows" @close-app="closeApp" @minimize-app="minimizeApp" @touch-app="touchApp"/>
      <MacOSTaskbar :macos-window="macosWindows" @openApp="openApp"/>
    </div>
  </div>
</template>

<style scoped>

.loading-enter-active,
.loading-leave-active {
  transition: all 0.1s ease;
}

.loading-enter-from,
.loading-leave-to {
  opacity: 0;
}

.login-enter-active,
.login-leave-active {
  transition: all 0.5s ease;
}

.login-enter-from,
.login-leave-to {
  opacity: 0;
  transform: scale(1.5);
}

.macos-wrapper{
  max-width: 100vw;
  max-height: 100dvh;
  height: 100dvh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
}
.macos-main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: black;
  height: 100%;
  width: 100%;
  max-width: 100vw;
  object-fit: contain;

  background-size: cover;
  background-size: center;
  background-repeat: no-repeat;
}
</style>
