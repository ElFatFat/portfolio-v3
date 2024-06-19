<script setup lang="ts">
import { useBattery, useNetwork } from '@vueuse/core'
import { ref } from 'vue';
import { type macosWindow } from '../interfaces';

const { charging, chargingTime, dischargingTime, level } = useBattery()
const { isOnline, offlineAt, downlink, downlinkMax, effectiveType, saveData, type } = useNetwork()

const props = defineProps({
  macosActiveApp: {
    type: Object as () => macosWindow | null,
    required: true
  }
});

const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric', hour12: false };

const currentTime = ref(capitalizeFirstLetter(new Intl.DateTimeFormat('fr-FR', options).format(new Date()).replace(',', ' à' )));
setInterval(() => {
  currentTime.value = capitalizeFirstLetter(new Intl.DateTimeFormat('fr-FR', options).format(new Date()).replace(',', ' à '));
}, 1000);

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const openURL = (url: string) => {
  window.open(url, '_blank');
};
</script>

<template>
  <div class="macos-topbar glass-effect">
    <div class="macos-topbar-left">
      <template v-if="macosActiveApp">
        <img :src="macosActiveApp.iconURL" alt="icon" class="macos-topbar-app-icon" @click="$emit('logOut')"/>
        <p class="macos-active-app-title">{{ macosActiveApp?.title}}</p>
        <p class="topbar-clickable-text" @click="openURL('/' + macosActiveApp.title)">Maximiser</p>
        <p class="topbar-clickable-text" @click="$emit('minimizeApp', macosActiveApp.title)">Minimiser</p>
        <p class="topbar-clickable-text" @click="$emit('closeApp', macosActiveApp.title)">Fermer</p>
      </template>
      <template v-else>
        <img src="/src/assets/appIcons/apple.png" alt="icon" class="macos-topbar-app-icon" @click="$emit('logOut')"/>
        <p class="macos-active-app-title">Valentin T.</p>
      </template>
    </div>
    <div class="macos-topbar-right">
      <div class="battery-section">
        <p>{{ (level*100).toFixed(0) + " %" || "100%" }}</p>
        <img v-if="level >= 0.80 && !charging" class="batteryIcon" src="/src/assets/batteryIcons/full-battery.png" alt="battery"/>
        <img v-else-if="level >= 0.80 && charging" class="batteryIcon" src="/src/assets/batteryIcons/full-battery-charging.png" alt="battery"/>
        <img v-else-if="level < 0.80 && level > 0.20 && !charging" class="batteryIcon" src="/src/assets/batteryIcons/half-battery.png" alt="battery"/>
        <img v-else-if="level < 0.80 && level > 0.20 && charging" class="batteryIcon" src="/src/assets/batteryIcons/half-battery-charging.png" alt="battery"/>
        <img v-else-if="level <= 0.20 && !charging" class="batteryIcon" src="/src/assets/batteryIcons/low-battery.png" alt="battery"/>
        <img v-else-if="level <= 0.20 && charging" class="batteryIcon" src="/src/assets/batteryIcons/low-battery-charging.png" alt="battery"/>
      </div>
      <img v-if="isOnline" class="wifiIcon" src="/src/assets/wifiIcons/wifi-connected.png" alt="network"/>
      <img v-else class="wifiIcon" src="/src/assets/wifiIcons/wifi-disconnected.png" alt="network"/>
      <p>{{ currentTime }}</p>
      </div>
  </div>
</template>

<style scoped>

.macos-active-app-title{
  font-family: 'SfProDisplay-Bold', sans-serif;
}
.macos-topbar{
  font-size: 0.9em;
  padding-inline: 1rem;
  width: 100%;
  min-height: 3%;
  display: flex;
  justify-content: space-between;
}

.macos-topbar *{
  user-select: none;
}

.macos-topbar-left{
  width: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
}

.macos-topbar-right{
  height: 100%;
  gap: 1rem;
  width: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.battery-section{
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
}
.batteryIcon{
  height: 1em;
}

.wifiIcon, .macos-topbar-app-icon{
  height: 1.3em;
  cursor: pointer;
}
.topbar-clickable-text{
  cursor: pointer;
}
.topbar-clickable-text:active{
}
</style>
