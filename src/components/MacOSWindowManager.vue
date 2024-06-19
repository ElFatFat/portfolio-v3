<script setup lang="ts">
import { computed } from 'vue';
import { type macosWindow } from '../interfaces';
import Window from './Window.vue';
  
const emits = defineEmits(['closeApp', 'minimizeApp', 'touchApp']);

const props = defineProps({
  macosWindow: {
    type: Object as () => macosWindow[],
    required: true
  } || []
});

const windowToShow = computed(() => {
  return props.macosWindow.filter(window => window.isRunning && !window.isMinimized);
});

const closeApp = (event: Event) => {
  emits('closeApp', event);
}

const minimizeApp = (event: Event) => {
  emits('minimizeApp', event);
}

const touchApp = (event: Event) => {
  emits('touchApp', event);
}
</script>

<template>
  <div class="macos-window-manager">
    <TransitionGroup name="windowTransition">
    <div v-for="window in windowToShow" :key="window.title" class="macos-window">
        <Window :window="window" @closeApp="closeApp" @minimizeApp="minimizeApp" @touchApp="touchApp"/>
    </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.macos-window-manager{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.windowTransition-enter-active,
.windowTransition-leave-active {
  transition: all 0.3s ease;
}
.windowTransition-enter-from,
.windowTransition-leave-to {
  opacity: 0;
  
}
.windowTransition-leave-active {
  position: absolute;
}
</style>
