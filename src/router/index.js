import { createWebHistory, createRouter } from 'vue-router'

import Home from '../views/Home.vue'
import Isotope from '../views/Isotope.vue'
import ProductZoom from '../views/ProductZoom.vue'
import SwiperSlider from '../views/SwiperSlider.vue'
import Lightbox from '../views/Lightbox.vue'

const routes = [
  { 
    path: '/',
    component: Home, 
    meta: { breadcrumb: 'Home' } 
  },
  { 
    path: '/isotope', 
    component: Isotope,
    meta: { breadcrumb: 'Isotope' }
  },
  { 
    path: '/product-zoom', 
    component: ProductZoom,
    meta: { breadcrumb: 'Product Zoom' } 
  },
  { 
    path: '/swiper-slider', 
    component: SwiperSlider,
    meta: { breadcrumb: 'Swiper Slider' } 
  },
  { 
    path: '/lightbox', 
    component: Lightbox,
    meta: { breadcrumb: 'Lightbox' } 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;