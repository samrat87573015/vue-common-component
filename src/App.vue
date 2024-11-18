<script setup>

import { RouterLink, RouterView } from 'vue-router'

import Breadcrumb from './components/Breadcrumb.vue';
import Menu from './components/Menu.vue';


</script>

<template>
  <div class="app_wrapper">


    <Menu />


    <div class="p-4">
      <ul v-if="$route.meta.breadcrumb !== 'Home'" class="flex gap-4 items-center">
        <li><router-link to="/">Home</router-link> /</li>
        <Breadcrumb />
      </ul>
      
      <!-- Rest of your app content -->
    </div>

    <router-view />
   
  </div>
</template>

