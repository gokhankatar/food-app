<template>

  <v-app-bar elevation="0" class="navbar px-2 px-sm-15 py-2 d-flex justify-space-between">
    <div
      @click="$router.replace('/')"
      class="logo cursor-pointer d-flex justify-center align-center ga-2"
    >
      <v-img :src="logoImg" class="icon" width="50" />
      <span class="text-subtitle-1 text-sm-h5 font-weight-medium">FoodApp</span>
    </div>
    <v-responsive />
    <div class="d-flex justify-center align-center ga-2">
      <div
      @click="_store.openAddFood"
      class="mode text-red-darken-1 rounded-xl pa-2 d-flex justify-center align-center ga-2 cursor-pointer"
    >
      <v-icon class="icon" icon="mdi-plus" />
      <span class="d-none d-sm-flex">Add Food</span>
    </div>

    <div
      @click="_store.changeTheme"
      class="mode text-red-darken-1 rounded-xl pa-2 d-flex justify-center align-center ga-2 cursor-pointer"
    >
      <v-icon
        class="icon"
        :icon="_store.theme === 'light' ? 'mdi-weather-night' : 'mdi-weather-sunny'"
      />
      <span class="d-none d-sm-flex">{{
        _store.theme === "light" ? "Dark Mode" : "Light Mode"
      }}</span>
    </div>
    </div>
   
  </v-app-bar>

  <v-container class="mt-15">
    <slot />
  </v-container>
</template>
<script setup>
import store from "../store/pinia";

const _store = store();
const logoImg = import.meta.env.VITE_LOGO_URL;
</script>

<style scoped>
.navbar {
  background: rgba(255, 0, 0, 0.1) !important;
}
.icon {
  transition: all 0.2s ease;
}

.mode {
  border: 1px solid #e53935;
}
.mode:hover {
  background-color: #e53935 !important;
  color: #fff !important;
}

.mode:hover .icon {
  transform: rotate(360deg);
}
</style>
