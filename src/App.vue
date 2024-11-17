<script setup>

import { RouterLink, RouterView } from 'vue-router'

import Breadcrumb from './components/Breadcrumb.vue';


</script>

<template>
  <div class="app_wrapper">

    <header class="py-4 bg-green-400">
      <div class="container mx-auto">
          <div class="app_header flex items-center justify-between">
              <div class="logo">
                <img src="./assets/vue.svg" alt="logo">

              </div>
              <nav>
                <ul class="flex items-center gap-4">
                  <li>
                    <RouterLink to="/">Home</RouterLink>
                  </li>
                  <li>
                    <RouterLink to="/isotope">Isotope</RouterLink>
                  </li>
                  <li>
                    <RouterLink to="/product-zoom">Product Zoom</RouterLink>
                  </li>
                  <li>
                    <RouterLink to="/swiper-slider">Swiper Slider</RouterLink>
                  </li>
                  <li>
                    <RouterLink to="/lightbox">Lightbox</RouterLink>
                  </li>
                </ul>
              </nav>
            </div>
        </div>
    </header>

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

