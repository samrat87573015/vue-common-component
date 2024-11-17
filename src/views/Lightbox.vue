<script setup>
import { ref } from 'vue';
import { ChevronRightIcon, ChevronLeftIcon, XIcon } from 'lucide-vue-next';

    const images = ref([
      'src/assets/img/isotop/img1.jpeg',
      'src/assets/img/isotop/img2.jpeg',
      'src/assets/img/isotop/img3.jpeg',
      'src/assets/img/isotop/img4.jpeg',
    ]);
    const isLightboxOpen = ref(false);
    const currentImageIndex = ref(0);

    const openLightbox = (index) => {
      currentImageIndex.value = index;
      isLightboxOpen.value = true;
    };

    const closeLightbox = () => {
      isLightboxOpen.value = false;
    };

    const nextImage = () => {
      currentImageIndex.value =
        (currentImageIndex.value + 1) % images.value.length;
    };

    const prevImage = () => {
      currentImageIndex.value =
        (currentImageIndex.value - 1 + images.value.length) % images.value.length;
    };


</script>



<template>
  <div>
    <!-- Image Gallery -->
    <div class="gallery h">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="gallery-item"
        @click="openLightbox(index)"
      >
        <img :src="image" alt="Gallery Image" class="thumbnail w-[300px] h-[300px] object-cover" />
      </div>
    </div>

    <ArrowRightIcon />
  

    <!-- Lightbox Modal -->
    <div v-if="isLightboxOpen" class="lightbox">
      <div class="lightbox-content">
        <button class="close-btn" @click="closeLightbox"><XIcon class="w-10 h-10 border border-gray-500" /></button>
        <button class="prev-btn" @click="prevImage"><ChevronLeftIcon class="w-10 h-10 border border-gray-500" /></button>
        <img :src="images[currentImageIndex]" alt="Lightbox Image" class="lightbox-image" />
        <button class="next-btn" @click="nextImage"><ChevronRightIcon class="w-10 h-10 border border-gray-500" /> </button>
      </div>
    </div>
  </div>
</template>


<style scoped>
.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.gallery-item {
  cursor: pointer;
}


.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
}


.lightbox-image {
  max-width: 90vw;
  max-height: 90vh;
}

.close-btn,
.prev-btn,
.next-btn {
  position: absolute;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
}

.close-btn {
  top: 10px;
  right: 20px;
}

.prev-btn {
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
}

.next-btn {
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
}
</style>

