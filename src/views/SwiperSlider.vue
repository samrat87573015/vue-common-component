<template>
  <div class="swiper-container w-full max-w-3xl mx-auto relative">
    <swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="30"
      :loop="true"
      :effect="'fade'"
      :pagination="{ clickable: true }"
      :autoplay="{ delay: 3000, disableOnInteraction: false }"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide v-for="slide in slides" :key="slide.id">
        <div class="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg overflow-hidden shadow-xl">
          <img :src="slide.image" :alt="slide.title" class="w-full h-64 object-cover" />
          <div class="p-6">
            <h2 class="text-2xl font-bold text-white mb-2">{{ slide.title }}</h2>
            <p class="text-white opacity-80">{{ slide.description }}</p>
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <div class="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
      <button @click="slidePrev" class="bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500">
        <ChevronLeftIcon class="w-6 h-6 text-purple-700" />
      </button>
    </div>
    <div class="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
      <button @click="slideNext" class="bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500">
        <ChevronRightIcon class="w-6 h-6 text-purple-700" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

const modules = [Navigation, Pagination, Autoplay, EffectFade]

const swiperInstance = ref(null)

const slides = ref([
  {
    id: 1,
    title: 'Beautiful Landscape',
    description: 'A stunning view of mountains and lakes.',
    image: '/assets/img/isotop/img1.jpeg'
  },
  {
    id: 2,
    title: 'City Skyline',
    description: 'An impressive urban landscape at night.',
    image: '/assets/img/isotop/img2.jpeg'
  },
  {
    id: 3,
    title: 'Tropical Beach',
    description: 'Crystal clear waters and white sand beaches.',
    image: '/assets/img/isotop/img3.jpeg'
  }
])

const onSwiper = (swiper) => {
  swiperInstance.value = swiper
  console.log('Swiper instance:', swiper)
}

const onSlideChange = () => {
  console.log('slide change')
}

const slidePrev = () => {
  if (swiperInstance.value) {
    swiperInstance.value.slidePrev()
  }
}

const slideNext = () => {
  if (swiperInstance.value) {
    swiperInstance.value.slideNext()
  }
}

onMounted(() => {
  console.log('Swiper component mounted')
})
</script>

<style scoped>
.swiper-container {
  padding: 2rem 0;
}

:deep(.swiper-pagination-bullet) {
  background-color: white;
  opacity: 0.7;
}

:deep(.swiper-pagination-bullet-active) {
  opacity: 1;
}

:deep(.swiper-slide) {
  opacity: 0 !important;
  transition: opacity 0.3s ease;
}

:deep(.swiper-slide-active) {
  opacity: 1 !important;
}
</style>