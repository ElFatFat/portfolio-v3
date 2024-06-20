<script setup lang="ts">
import { ref } from 'vue';



const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
const timeOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: false };

const currentDate = new Date();

const currentTime = ref({
  date: capitalizeFirstLetter(new Intl.DateTimeFormat('fr-FR', dateOptions).format(currentDate)),
  hour: new Intl.DateTimeFormat('fr-FR', timeOptions).format(currentDate)
});

setInterval(() => {
  const now = new Date();
  currentTime.value.date = capitalizeFirstLetter(new Intl.DateTimeFormat('fr-FR', dateOptions).format(now));
  currentTime.value.hour = new Intl.DateTimeFormat('fr-FR', timeOptions).format(now);
}, 1000);

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

</script>

<template>
  <div class="macos-login" @click="$emit('login')">
    <div class="macos-login-date-div">
      <p class="macos-login-date">{{ currentTime.date }}</p>
      <p class="macos-login-time">{{ currentTime.hour }}</p>
    </div>
    <div class="macos-login-user">
      <img src="/src/assets/dog_cursed.jpg" class="user-icon" alt="user" />
    </div>
    
  </div>

</template>

<style scoped>
.user-icon{
  border-radius: 50%;
  animation: rotateImage 5s linear infinite;
  width: clamp(5em, 15vw, 15em);
}
@keyframes rotateImage {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.macos-login{
  user-select: none;
  height: 100dvh;
  width: 100%;
  aspect-ratio: 16/9;
  backdrop-filter: blur(10px);
  z-index: 10;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
}

.macos-login-date-div{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  }

  .macos-login-date{
    font-family: 'SfProDisplay-Rounded-Medium';

    font-size: 2rem;
    font-size: clamp(1em, 2.5vw, 9em);

  }

  .macos-login-time{
    font-family: 'SfProDisplay-Rounded-Bold';
    line-height: 1em;
    font-size: clamp(5em, 10vw, 9em);
  }
</style>
