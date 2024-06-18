<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { type macosWindow } from '../interfaces';

const props = defineProps({
  macosWindow: {
    type: Object as () => macosWindow[],
    required: true
  }
});
</script>

<template>
  <div class="macos-taskbar glass-effect-darker">
    <div v-for="window in macosWindow" :key="window.title" class="macos-app">
      <img :src="window.iconURL" alt="icon" class="macos-icon"/>
      <div v-if="window.isRunning" class="macos-activity running"></div>
      <div v-else class="macos-activity"></div>
    </div>
  </div>

</template>

<style scoped>
.macos-taskbar{
  width: fit-content;
  padding: 0.2em 0.2em 0em 0.2em;
  gap: 0.7em;
  min-width: 150px;
  height: 100%;
  max-height: 6%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  border: solid 1px rgba(255, 255, 255, 0.2);
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
  margin-bottom: 5px;
}

.macos-app{
  height: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;


}
.macos-icon{
  height: 90%;
  transition: all 0.1s;
}

.macos-activity{
  height: 10%;
  aspect-ratio: 1/1;
  border-radius: 50%;
}

.running{
  background-color: rgba(33, 33, 33, 0.813);
}

.macos-app:hover{
  cursor: pointer;
  transform: scale(1.2) translateY(-5px);
}

.macos-icon:active{
  transform: scale(0.95);
  filter: brightness(0.8);
}
</style>
