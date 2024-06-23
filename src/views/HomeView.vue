<script setup lang="ts">
import { ref } from 'vue';
import MacOSScreen from '../components/MacOSScreen.vue'
import { useFullscreen } from '@vueuse/core'

const macosscreen = ref<HTMLElement | null>(null)

const { isFullscreen, enter, exit, toggle } = useFullscreen(macosscreen)

</script>

<template>
  <main ref="macosscreen">
    <MacOSScreen/>
    <!-- <button @click="toggle" class="fullscreen-button">
      {{ isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen' }}
    </button> -->
  </main>
</template>

<style scoped>
.fullscreen-button{
  position: fixed;
  top: 0;
  right: 0;
  padding: 1rem;
  background-color: #000;
  color: #fff;
  border: none;
  cursor: pointer;
  z-index: 1000;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  border-radius: 0 0 0 0.5rem;
  transition: background-color 0.3s;
}

main{
  overflow: hidden;
}
</style>
