<script setup lang="ts">
import MacOSTopbar from './MacOSTopbar.vue';
import MacOSTaskbar from './MacOSTaskbar.vue';
import type { DefineComponent } from 'vue';

interface macosWindow{
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
</script>

<template>
  <div class="macos-wrapper">
    <div class="macos-main" :style="{'background-image': 'url(/src/assets/wallpapers/01.jpeg)'}">
      <MacOSTopbar/>
      <p>Test</p>
      <MacOSTaskbar/>
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
