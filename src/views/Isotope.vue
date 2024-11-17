<template>

  <div class="masonry-isotope container mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-center text-foreground">Masonry Layout with Isotope</h1>
    
    <div class="filter-buttons mb-6 flex flex-wrap justify-center gap-2">
      <button
        v-for="filter in filters"
        :key="filter"
        @click="updateFilter(filter)"
        class="px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ease-in-out"
        :class=" filter === currentFilter ? 'bg-red-500 text-white' : ' bg-gray-200 text-gray-800' "
        
      >
        {{ filter }}
      </button>
    </div>

    <div ref="gridRef" class="masonry-grid">
      <div
        v-for="item in items"
        :key="item.id"
        :class="['masonry-item', item.category.replace(' ', '-').toLowerCase()]"
        class="mb-4"
      >
        <div class="bg-card rounded-lg shadow-md overflow-hidden">
          <img :src="item.image" :alt="item.title" class="w-full object-cover" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Isotope from 'isotope-layout';

const items = [
  { id: 1, title: 'Item 1', category: 'Category A', image: '/assets/img/isotop/img1.jpeg', description: 'A short description for Item 1.' },
  { id: 2, title: 'Item 2', category: 'Category B', image: '/assets/img/isotop/img2.jpeg', description: 'This is a longer description for Item 2 to demonstrate varying heights in the masonry layout.' },
  { id: 3, title: 'Item 3', category: 'Category A', image: '/assets/img/isotop/img3.jpeg', description: 'Item 3 has a medium-length description.' },
  { id: 4, title: 'Item 4', category: 'Category C', image: '/assets/img/isotop/img4.jpeg', description: 'The description for Item 4 is quite long to show how the masonry layout adapts to different content lengths. This helps to create an interesting and dynamic grid.' },
  { id: 5, title: 'Item 5', category: 'Category B', image: '/assets/img/isotop/img5.jpeg', description: 'A brief note about Item 5.' },
  { id: 6, title: 'Item 6', category: 'Category C', image: '/assets/img/isotop/img6.jpeg', description: 'Item 6 has some interesting details that make its description a bit longer than average.' },
  { id: 7, title: 'Item 7', category: 'Category A', image: '/assets/img/isotop/img7.jpeg', description: 'Lucky number 7 with a standard description length.' },
  { id: 8, title: 'Item 8', category: 'Category B', image: '/assets/img/isotop/img8.jpeg', description: 'The last item in our list, number 8, wraps up with a medium-sized description to balance out the layout.' },
];

const filters = ['All', 'Category A', 'Category B', 'Category C'];
const currentFilter = ref('All');
const gridRef = ref(null);
let isotope = null;

onMounted(() => {
  isotope = new Isotope(gridRef.value, {
    itemSelector: '.masonry-item',
    layoutMode: 'masonry',
    masonry: {
      columnWidth: '.masonry-item',
      gutter: 16
    }
  });
});

onUnmounted(() => {
  if (isotope) {
    isotope.destroy();
  }
});

const updateFilter = (filter) => {
  currentFilter.value = filter;
  if (isotope) {
    isotope.arrange({
      filter: filter === 'All' ? '*' : `.${filter.replace(' ', '-').toLowerCase()}`
    });
  }
};
</script>

<style scoped>
.masonry-isotope {
  @apply max-w-6xl mx-auto p-6;
}


.masonry-grid {
  @apply transition-all duration-300 ease-in-out;
}

.masonry-item {
  @apply w-full sm:w-1/2 lg:w-1/3 p-2 transition-all duration-300 ease-in-out;
}
.masonry-item img {
    width: 100%;
}

@media (min-width: 640px) {
  .masonry-item {
    width: calc(50% - 16px);
  }
}

@media (min-width: 1024px) {
  .masonry-item {
    width: calc(33.333% - 16px);
  }
}
</style>










