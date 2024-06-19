<script setup lang="ts">
import { useBattery, useNetwork } from '@vueuse/core'
import { ref } from 'vue';

const { charging, chargingTime, dischargingTime, level } = useBattery()
const { isOnline, offlineAt, downlink, downlinkMax, effectiveType, saveData, type } = useNetwork()


const options = { weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric', hour12: false };
// @ts-ignore
const currentTime = ref(capitalizeFirstLetter(new Intl.DateTimeFormat('fr-FR', options).format(new Date()).replace(',', ' à' )));
setInterval(() => {
  // @ts-ignore
  currentTime.value = capitalizeFirstLetter(new Intl.DateTimeFormat('fr-FR', options).format(new Date()).replace(',', ' à '));
}, 1000);

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

</script>

<template>
  <div class="macos-topbar glass-effect">
    <div class="macos-topbar-left"></div>
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

.wifiIcon{
  height: 1.3em;
}
</style>
