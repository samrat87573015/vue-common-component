<template>
  <nav aria-label="Breadcrumb" class="text-sm">
    <ol class="list-none p-0 inline-flex items-center">
      <li 
        v-for="(crumb, index) in breadcrumbs" 
        :key="crumb.name" 
        class="flex items-center"
        :class="{ 'text-gray-500': index === breadcrumbs.length - 1 }"
      >
        <template v-if="index > 0">
          <ChevronRightIcon class="h-4 w-4 text-gray-400 mx-2" />
        </template>
        <template v-if="index === breadcrumbs.length - 1">
          <span aria-current="page">{{ crumb.label }}</span>
        </template>
        <template v-else>
          <router-link
            :to="{ name: crumb.name }"
            class="text-blue-600 hover:text-blue-800 transition-colors duration-200 ease-in-out"
          >
            {{ crumb.label }}
          </router-link>
        </template>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ChevronRightIcon } from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();

const breadcrumbs = computed(() => {
  const matchedRoutes = route.matched.filter(route => route.meta && route.meta.breadcrumb);
  
  return matchedRoutes.map(route => {
    return {
      name: route.name,
      label: typeof route.meta.breadcrumb === 'function' 
        ? route.meta.breadcrumb(route)
        : route.meta.breadcrumb
    };
  });
});
</script>

<style scoped>
@media (max-width: 640px) {
  nav {
    font-size: 0.75rem;
  }
}
</style>