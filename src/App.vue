<template>
  <v-app :theme="_store.theme">
    <v-main>
      <component :is="$route.meta.layout">
        <router-view />
      </component>
    </v-main>
  </v-app>
</template>

<script setup>
import store from "./store/pinia";
import app from "./db/db";

const _store = store();
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap");

html {
  scrollbar-width: thin;
  scrollbar-color: rgb(199, 27, 27) #f1f1f1;
  scroll-behavior: smooth;
}

body {
  font-family: "Nunito Sans", sans-serif;
}
</style>
