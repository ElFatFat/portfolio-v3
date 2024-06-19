<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { type macosWindow } from '../interfaces';
import { rand, useElementHover, useElementSize } from '@vueuse/core';
import { UseDraggable as Draggable} from '@vueuse/components';


const headerDrag = ref<HTMLElement | null>(null)

//Get size of parent
const screenX = innerWidth;
const screenY = innerHeight;

const hoverableButtons = ref<HTMLElement>()
const isHovered = useElementHover(hoverableButtons)

const props = defineProps({
  window: {
    type: Object as () => macosWindow,
    required: true
  }
});

</script>

<template>
    <Draggable class="macos-window" ref="window" :handle="headerDrag" :prevent-default="true" :initial-value="{ x: rand(screenX*0.1, screenX*0.9), y: rand(screenY*0.1, screenY*0.9) }" :storage-key="window.title" storage-type="session" :style="{ zIndex: window.position.depth }" @click="$emit('touchApp', window.title)" @start="$emit('touchApp', window.title)">
        <div class="macos-window-header" ref="headerDrag">
        <div class="macos-window-header-button" ref="hoverableButtons">
            <img src="/src/assets/windowButtons/close-hover.png" alt="close" v-if="isHovered" @click="$emit('closeApp', window.title)"/>
            <img src="/src/assets/windowButtons/close-normal.png" alt="close" v-else/>
            <img src="/src/assets/windowButtons/min-hover.png" alt="close" v-if="isHovered" @click="$emit('minimizeApp', window.title)"/>
            <img src="/src/assets/windowButtons/min-normal.png" alt="close" v-else/>
            <img src="/src/assets/windowButtons/max-hover.png" alt="close" v-if="isHovered"/>
            <img src="/src/assets/windowButtons/max-normal.png" alt="close" v-else/>
        </div>
        <div class="macos-window-header-title">
          <img :src="window.iconURL" alt="icon" class="macos-icon"/>
            <p>{{ window.title }}</p>
        </div>
        <div></div>
        </div>
        <div class="macos-window-content">
            <window.content/>
        </div>
    </Draggable>
</template>

<style scoped>

.macos-window {
  min-width: fit-content;
  min-height: 50px;
    position: fixed;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    resize: both;
    backdrop-filter: blur(3px);
  }
.macos-window-header{
    user-select: none;
    padding-inline: 5px;
    width: 100%;
    height: 30px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: center;
    align-items: center;
    background-color: rgb(168, 168, 168);
}
.macos-window-header-button{
    width: fit-content;
    height: 20px;
    display: flex;
    gap: 5px;
    justify-content: center;
    align-items: center;
}

.macos-window-header-button img{
    width: 80%;
    height: 80%;
    object-fit: cover;
    cursor: pointer;
}


.macos-window-header-button img:active{
    filter: brightness(0.8);
}

.macos-window-header-title{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.3em;
    text-wrap: nowrap;
}
.macos-icon{
    width: 20px;
    height: 20px;
}

.v-enter-from, .v-leave-to {
    opacity: 0;
    transform: translateY(10px);
}

.v-enter-to, .v-leave-from {
    opacity: 1;
    transform: translateY(0);
}
</style>
