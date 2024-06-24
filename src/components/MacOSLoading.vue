<script setup lang="ts">
import { onMounted, ref } from 'vue';
const emits = defineEmits(['loaded']);

    const assets = [
        "/appIcons/apple.png",
        "/appIcons/chrome.png",
        "/appIcons/spotify.png",
        "/wallpapers/01.jpg",
        "/windowButtons/close-hover.png",
        "/windowButtons/close-normal.png",
        "/windowButtons/max-hover.png",
        "/windowButtons/max-normal.png",
        "/windowButtons/min-hover.png",
        "/windowButtons/min-normal.png",
    ];
    const loadedAssets = ref(0);
    const totalAssets = ref(assets.length);
    const progress = ref(0);

function updateProgress() {
    loadedAssets.value++;
    progress.value = (loadedAssets.value / totalAssets.value) * 100;
    if (progress.value === 100) {
        setTimeout(() => {
            emits('loaded');
        }, 1000);
    }
}
function preloadAssets() {
    assets.forEach((asset) => {
        const img = new Image();
        img.onload = updateProgress;
        img.src = asset;
    });
}

onMounted(() => {
    preloadAssets();
});
</script>

<template>
    <div class="macos-loading">
        <img src="/appIcons/apple-white.png" alt="icon" class="macos-topbar-app-icon" @click="$emit('loaded')"/>
        <div class="macos-slider-wrapper">
            <div class="macos-slider-inner" :style="{width: progress + '%'}">

            </div>
        </div>
    </div>

</template>

<style scoped>
.macos-loading{
  user-select: none;
  height: 100dvh;
  width: 100%;
  z-index: 11;
  position: absolute;
  display: flex;
  gap: 3em;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
}

.macos-slider-wrapper{
  width: 250px;
  height: 12px;
  background-color: transparent;
  border: 2px solid white;
  border-radius:6px;
  overflow: hidden;
}

.macos-slider-inner{
    border-radius: 4px;
  height: 100%;
  background-color: white;
  transition: width 0.5s;
}
.macos-topbar-app-icon{
    height: 8em;
    max-height: 5vh;
}
</style>
