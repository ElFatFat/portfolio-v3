<script setup lang="ts">
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
    <div v-for="window in macosWindow" :key="window.title" class="macos-app" ref="macosAppRef" @click="$emit('openApp', window.title)">
      <div id="tooltip" ref="floating">{{ window.title }}</div>
      <img :src="window.iconURL" alt="icon" class="macos-icon"/>
      <div v-if="window.isRunning" class="macos-activity running"></div>
      <div v-else class="macos-activity"></div>
    </div>
  </div>

</template>

<style scoped>

#tooltip {
  display: none;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(8px);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  padding: 0.1em 0.5em;
  width: max-content;
  position: absolute;
  top: -70%;
  left: calc(width/2);
  font-size: 0.8em;
  border-radius: 4px;
}
#tooltip::after {
  content: "";
  position: absolute;
  top: 100%; /* Position the arrow just below the tooltip */
  left: 50%;
  margin-left: -5px; /* Center the arrow */
  border-width: 5px;
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.25) transparent transparent transparent;
  /* Arrow points upwards */
}
.macos-taskbar{
  user-select: none;
  width: fit-content;
  padding: 0.2em 0.4em 0em 0.4em;
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
  gap: 0.1em;
  align-items: center;
  transition: all 0.2s;
}

.macos-app:hover #tooltip{
  display: block;
}
.macos-icon{
  height: 80%;
  transition: all 0.1s;
  border-radius: 12px;
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
