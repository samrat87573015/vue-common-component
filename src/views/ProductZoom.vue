<template>
  <div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Left Column - Images -->
      <div class="flex gap-4">
        <!-- Thumbnails -->
        <div class="flex flex-col gap-2">
          <div 
            v-for="(image, index) in images" 
            :key="index"
            class="w-20 h-20 border rounded cursor-pointer hover:border-gray-400"
            :class="{ 'border-black': currentImageIndex === index }"
            @click="currentImageIndex = index"
          >
            <img :src="image" class="w-full h-full object-cover" :alt="`Product view ${index + 1}`">
          </div>
        </div>

        <!-- Main Image with Zoom -->
        <div 
          class="flex-1 relative overflow-hidden"
          @mousemove="handleZoom"
          @mouseleave="isZooming = false"
          ref="mainImageContainer"
        >
          <img 
            :src="currentImage" 
            class="w-full h-auto"
            ref="mainImage"
            :style="zoomStyle"
            alt="Product main view"
          >
        </div>
      </div>

      <!-- Right Column - Product Details -->
      <div class="space-y-6">
        <h1 class="text-3xl font-semibold">{{ product.name }}</h1>
        
        <!-- Rating -->
        <div class="flex items-center gap-2">
          <div class="flex">
            <StarIcon v-for="i in 5" :key="i" class="w-4 h-4 text-yellow-400" />
          </div>
          <span class="text-sm text-gray-500">(0 customer reviews)</span>
        </div>

        <!-- Price -->
        <div class="text-xl">
          {{ product.price.min }}$ - {{ product.price.max }}$
        </div>

        <!-- Real-time Viewers -->
        <div class="text-sm text-gray-600">
          {{ product.viewers }} people are viewing this right now
        </div>

        <!-- Color Selection -->
        <div>
          <h3 class="font-medium mb-2">Color:</h3>
          <div class="flex gap-2">
            <button
              v-for="(color, index) in product.colors"
              :key="index"
              class="w-6 h-6 rounded-full border-2"
              :class="{ 'border-black': selectedColor === index }"
              :style="{ backgroundColor: color }"
              @click="selectedColor = index"
            ></button>
          </div>
        </div>

        <!-- Quantity -->
        <div class="flex items-center gap-4">
          <div class="flex items-center border rounded">
            <button 
              class="px-3 py-2 hover:bg-gray-100"
              @click="quantity > 1 && quantity--"
            >-</button>
            <span class="px-3 py-2">{{ quantity }}</span>
            <button 
              class="px-3 py-2 hover:bg-gray-100"
              @click="quantity++"
            >+</button>
          </div>
          
          <button 
            class="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700"
            @click="addToCart"
          >
            Add To Cart
          </button>
          
          <button class="text-gray-600 hover:text-gray-800">
            <HeartIcon class="w-6 h-6" />
          </button>
          
          <button class="text-gray-600 hover:text-gray-800">
            <RefreshCwIcon class="w-6 h-6" />
          </button>
        </div>

        <button 
          class="w-full bg-white border border-gray-300 px-6 py-2 rounded hover:bg-gray-50"
        >
          Buy Now
        </button>



        <!-- Product Info -->
        <div class="space-y-2 text-sm text-gray-600">
          <div>SKU: {{ product.sku }}</div>
          <div>Categories: {{ product.categories.join(', ') }}</div>
          <div>Tags: {{ product.tags.join(', ') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { StarIcon, HeartIcon, RefreshCwIcon } from 'lucide-vue-next'

// Sample product data
const product = {
  name: 'Phoebe Mini Bag',
  price: { min: 70.00, max: 90.00 },
  viewers: 36,
  colors: ['#FFFFFF', '#6B7280', '#374151'],
  sku: '92100-3.5-2',
  categories: ['Accessory', 'Bags', 'Handbag'],
  tags: ['hot', 'trend']
}

// Images array (replace with actual image URLs)
const images = [
  'https://images.pexels.com/photos/24531988/pexels-photo-24531988/free-photo-of-historical-deutsche-orient-bank-building-in-istanbul-turkey.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  'https://images.pexels.com/photos/28847012/pexels-photo-28847012/free-photo-of-stunning-view-of-brussels-town-hall-in-belgium.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  'https://images.pexels.com/photos/5256400/pexels-photo-5256400.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  'https://images.pexels.com/photos/24531988/pexels-photo-24531988/free-photo-of-historical-deutsche-orient-bank-building-in-istanbul-turkey.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
]


// State
const currentImageIndex = ref(0)
const selectedColor = ref(0)
const quantity = ref(1)
const isZooming = ref(false)
const zoomLevel = ref(1.5)
const zoomPosition = ref({ x: 0, y: 0 })

// Refs for zoom functionality
const mainImageContainer = ref(null)
const mainImage = ref(null)

// Computed
const currentImage = computed(() => images[currentImageIndex.value])

const zoomStyle = computed(() => {
  if (!isZooming.value) return {}
  return {
    transform: `scale(${zoomLevel.value})`,
    transformOrigin: `${zoomPosition.value.x}% ${zoomPosition.value.y}%`,
    transition: 'transform 0.1s ease-out'
  }
})

// Methods
const handleZoom = (event) => {
  if (!mainImageContainer.value) return
  
  const rect = mainImageContainer.value.getBoundingClientRect()
  const x = ((event.clientX - rect.left) / rect.width) * 100
  const y = ((event.clientY - rect.top) / rect.height) * 100
  
  zoomPosition.value = { x, y }
  isZooming.value = true
}

const addToCart = () => {
  // Implement cart functionality
  console.log('Adding to cart:', {
    product: product.name,
    quantity: quantity.value,
    color: selectedColor.value
  })
}
</script>

<style scoped>
.container img {
  transition: transform 0.1s ease-out;
}
</style>