import { createWebHistory, createRouter } from 'vue-router'

import Home from '../views/Home.vue'
import Isotope from '../views/Isotope.vue'
import ProductZoom from '../views/ProductZoom.vue'
import SwiperSlider from '../views/SwiperSlider.vue'
import Lightbox from '../views/Lightbox.vue'
import OtpValidation from '../views/OtpValidation.vue'

const routes = [
  { 
    path: '/',
    name: 'Home',
    component: Home, 
    meta: { breadcrumb: 'Home' } 
  },
  { 
    path: '/isotope',
    name: 'Isotope',
    component: Isotope,
    meta: { breadcrumb: 'Isotope' }
  },
  { 
    path: '/product-zoom', 
    name: 'ProductZoom',
    component: ProductZoom,
    meta: { breadcrumb: 'Product Zoom' } 
  },
  { 
    path: '/swiper-slider', 
    name: 'SwiperSlider',
    component: SwiperSlider,
    meta: { breadcrumb: 'Swiper Slider' } 
  },
  { 
    path: '/lightbox', 
    name: 'Lightbox', // name is importent for the breadcrumb
    component: Lightbox,
    meta: { breadcrumb: 'Lightbox' },
    children: [
      { 
        path: '/lightbox-2', 
        name: 'Lightbox2',
        component: Lightbox,
        meta: { breadcrumb: 'Lightbox-2' },
        children: [
          { 
            path: '/lightbox-3', 
            name: 'Lightbox3',
            component: Lightbox,
            meta: { breadcrumb: 'Lightbox-3' } 
          },
        ] 
      },
    ] 
  },
  { 
    path: '/otp-validation', 
    component: OtpValidation,
    meta: { breadcrumb: 'OtpValidation' } 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;