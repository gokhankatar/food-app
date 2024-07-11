<template>
  <!-- loading bar -->
  <v-progress-circular
    class="loading-bar"
    :size="90"
    :width="9"
    :color="_store.theme === 'light' ? 'red-darken-1' : 'red-lighten-2'"
    indeterminate
  ></v-progress-circular>
</template>

<script setup>
import store from "../store/pinia";

const _store = store();
</script>

<style scoped>
.loading-bar {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
