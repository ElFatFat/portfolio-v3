<script setup lang="ts">

</script>

<template>
    <div class="iframe-container">
        <!-- <iframe src="https://sae501-salle317.alwaysdata.net/#/accueil" frameborder="0" style="overflow:hidden;height:100%;width:100%" height="100%" width="100%"></iframe> -->

        <iframe title="Chrome" src="https://sae501-salle317.alwaysdata.net/#/accueil" class="responsive-iframe" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    </div>

</template>

<style scoped>

.iframe-container {
  overflow: hidden;
  padding-top: 100%;
  position: relative;
} 

.responsive-iframe {
  position: absolute;
  top: 0;
  left: 0;
  border: 0;
  width: 100%;
  height: 100%;
}
</style>
