<template>
  <div class="bg-green-500">
    <!-- Mobile Menu Button -->
    <button @click="isOpen = !isOpen" class="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-gray-800 text-white">
      <MenuIcon v-if="!isOpen" class="w-6 h-6" />
      <XIcon v-else class="w-6 h-6" />
    </button>

    <!-- Mobile Sidebar -->
    <div v-if="isOpen" class="lg:hidden fixed inset-0 bg-black/50 z-40" @click="isOpen = false"></div>

    <nav :class="[
      'fixed lg:relative top-0 bottom-0 left-0 w-64 lg:w-auto transform transition-transform duration-300 ease-in-out z-50',
      'bg-gray-900 lg:bg-transparent text-white lg:text-gray-800',
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]">

      <div class="flex container mx-auto items-center justify-between p-4">
        <!-- Logo -->
        <div class="logo">
          <router-link to="/"><img src="/assets/vue.svg" alt="logo"></router-link>
        </div>

        <!-- Desktop Navigation -->

        <div class="main-menu">
          <ul class="hidden lg:flex lg:items-center lg:space-x-4 lg:text
          -sm">
            <li v-for="item in menuItems"><router-link :to="item.Link">{{ item.label }}</router-link><ChevronDownIcon v-if="item.children" class="w-4 h-4"/>
              <ul v-if="item.children"  class="sub-menu">
                <li v-for="child in item.children"><router-link :to="child.Link">{{ child.label }}</router-link><ChevronDownIcon v-if="child.children" class="w-4 h-4"/>
                <ul v-if="child.children" class="sub-menu">
                  <li v-for="subChild in child.children"><router-link :to="subChild.Link">{{ subChild.label }}</router-link></li>
                </ul>
                </li>
              </ul>
            </li>
            
          </ul>
        </div>

      </div>

      <!-- Mobile Navigation -->
      <div class="lg:hidden space-y-1 p-4">
        <template v-for="(item, index) in menuItems" :key="index">
          <div>
            <RouterLink :to="item.Link" class="w-full text-left px-4 py-2 hover:bg-gray-800 rounded flex items-center justify-between"
              @click="item.isOpen = !item.isOpen">
              {{ item.label }}
              <ChevronDownIcon v-if="item.children" class="w-4 h-4 transition-transform duration-200"
                :class="{ 'rotate-180': item.isOpen }" />
            </RouterLink>

            <!-- Mobile Submenu -->
            <div v-if="item.children" v-show="item.isOpen" class="ml-4 space-y-1">
              <template v-for="(child, childIndex) in item.children" :key="childIndex">
                <div>
                  <RouterLink :to="child.Link"
                    class="w-full text-left px-4 py-2 hover:bg-gray-800 rounded flex items-center justify-between"
                    @click="child.isOpen = !child.isOpen">
                    {{ child.label }}
                    <ChevronDownIcon v-if="child.children" class="w-4 h-4 transition-transform duration-200"
                      :class="{ 'rotate-180': child.isOpen }" />
                  </RouterLink>

                  <!-- Mobile Sub-submenu -->
                  <div v-if="child.children" v-show="child.isOpen" class="ml-4 space-y-1">
                    <a v-for="(subChild, subIndex) in child.children" :key="subIndex" href="#"
                      class="block px-4 py-2 hover:bg-gray-800 rounded">
                      {{ subChild.label }}
                    </a>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </template>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { MenuIcon, XIcon, ChevronDownIcon, ChevronRightIcon } from 'lucide-vue-next'

const isOpen = ref(false)

const menuItems = reactive([
  {
    label: 'Home',
    Link: '/',
    isOpen: false,
  },
  {
    label: 'Components',
    Link: '#',
    isOpen: false,
    children: [
      { label: 'Isotope', Link: '/isotope', isOpen: false, },
      { label: 'Product Zoom', Link: '/product-zoom', isOpen: false },
      { label: 'Swiper Slider', Link: '/swiper-slider', isOpen: false },
      { label: 'Lightbox', Link: '/lightbox', isOpen: false },
      { label: 'OTP Validation', Link: '/otp-validation', isOpen: false },

    ]
  },
])
</script>

<style scoped>
/* Prevent body scroll when mobile menu is open */
:global(body.menu-open) {
  overflow: hidden;
}
.main-menu{
  position: relative;
}
.main-menu ul li{
  display: flex;
  align-items: center;
  gap: 5px;
}
.main-menu ul li .sub-menu{
  position: absolute;
  top: 100%;
  left: 0;
  width: 200px;
  padding: 10px 15px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  opacity: 0;
  visibility: hidden;
}
.main-menu ul li:hover .sub-menu{
  opacity: 1;
  visibility: visible;
}
.main-menu ul li .sub-menu li{
  display: block;
  margin-bottom: 5px;
}
</style>