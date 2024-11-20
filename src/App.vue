<script setup>

import { RouterLink, RouterView } from 'vue-router'

import Breadcrumb from './components/Breadcrumb.vue';
import Menu from './components/Menu.vue';
import { HouseIcon, ChevronRightIcon } from 'lucide-vue-next';


</script>

<template>
  <div class="app_wrapper">


    <Menu />

  <div v-if="$route.meta.breadcrumb !== 'Home'" class="bg-white shadow">
    <div class="container mx-auto p-4">
      <ul class="flex gap-4 items-center">
        <li class="flex items-center gap-3"><router-link to="/"><HouseIcon class="w-4 h-4" /></router-link><ChevronRightIcon class="w-4 h-4" /></li>
        <Breadcrumb />
      </ul>
    </div>
  </div>
    <router-view />
   
  </div>
</template>

