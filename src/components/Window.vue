<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { type macosWindow } from '../interfaces';
import { rand, useElementHover, useElementSize } from '@vueuse/core';
import { UseDraggable as Draggable} from '@vueuse/components';

const router = useRouter();
const headerDrag = ref<HTMLElement | null>(null)

//Get size of parent
const screenX = innerWidth;
const screenY = innerHeight;

const hoverableButtons = ref<HTMLElement>()
const isHovered = useElementHover(hoverableButtons)

const props = defineProps({
  macosWindow: {
    type: Object as () => macosWindow,
    required: true
  }
});

const openURL = (url: string) => {
    router.push(url);
};


</script>

<template>
    <Draggable class="macos-window" ref="window" :handle="headerDrag" :prevent-default="true" :initial-value="{ x: rand(screenX*0.3, screenX*0.7), y: rand(screenY*0.3, screenY*0.5) }" :storage-key="macosWindow.title" storage-type="session" :style="{ zIndex: macosWindow.size.depth, minWidth: macosWindow.size.minwidth + 'px', minHeight: macosWindow.size.minheight  + 'px', maxWidth: macosWindow.size.maxwidth + 'px', maxHeight: macosWindow.size.maxheight  + 'px' }" @click="$emit('touchApp', macosWindow.title)" @start="$emit('touchApp', macosWindow.title)">
        <div class="macos-window-header" ref="headerDrag" :style="{ backgroundColor: macosWindow.backgroundColor ||  '#b8b8b8' }">
        <div class="macos-window-header-button" ref="hoverableButtons">
            <img src="/windowButtons/close-hover.png" alt="close" v-if="isHovered" @click="$emit('closeApp', macosWindow.title)"/>
            <img src="/windowButtons/close-normal.png" alt="close" v-else/>
            <img src="/windowButtons/min-hover.png" alt="close" v-if="isHovered" @click="$emit('minimizeApp', macosWindow.title)"/>
            <img src="/windowButtons/min-normal.png" alt="close" v-else/>
            <img src="/windowButtons/max-hover.png" alt="close" v-if="isHovered" @click="openURL('/' + macosWindow.title)"/>
            <img src="/windowButtons/max-normal.png" alt="close" v-else/>
        </div>
        <div class="macos-window-header-title" :style="{ color: macosWindow.headerTextColor ||  'black' }">
          <img :src="macosWindow.iconURL" alt="icon" class="macos-icon"/>
            <p>{{ macosWindow.title }}</p>
        </div>
        <div></div>
        </div>
        <div class="macos-window-content" :style="{ backgroundColor: macosWindow.backgroundColor}">
            <macosWindow.content/>
        </div>
    </Draggable>
</template>

<style scoped>

.macos-window {
  user-select: none;
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
    background-color: #b8b8b8;
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
.macos-window-content{
    overflow: auto;
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
