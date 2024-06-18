<script setup lang="ts">
import { useBattery } from '@vueuse/core'
import { ref } from 'vue';

const { charging, chargingTime, dischargingTime, level } = useBattery()

const options = { weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric', hour12: false };
const currentTime = ref(capitalizeFirstLetter(new Intl.DateTimeFormat('fr-FR', options).format(new Date()).replace(',', ' à' )));
setInterval(() => {
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
      <p>{{ level*100 + " %" || "100%" }}</p>
      <p>{{ currentTime }}</p>
      </div>
  </div>
</template>

<style scoped>
.macos-topbar{
  padding-inline: 1rem;
  width: 100%;
  min-height: 3%;
  display: flex;
  justify-content: space-between;
}

.macos-topbar-left{
  width: 50%;
  display: flex;
  justify-content: flex-start;
}

.macos-topbar-right{
  gap: 1rem;
  width: 50%;
  display: flex;
  justify-content: flex-end;
}
</style>
