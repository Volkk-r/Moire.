import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '@/pages/MainPage'
import CartPage from '@/pages/CartPage'
import NotFoundPage from '@/pages/NotFoundPage'
import OrderPage from '@/pages/OrderPage'
import OrderInfoPage from '@/pages/OrderInfoPage'
import ProductPage from '@/pages/ProductPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainPage
  },
  {
    path: '/product/:id',
    name: 'product',
    component: ProductPage
  },
  {
    path: '/cart-product/',
    name: 'basket',
    component: CartPage
  },
  {
    path: '/order',
    name: 'order',
    component: OrderPage
  },
  {
    path: '/order/:id',
    name: 'orderInfo',
    component: OrderInfoPage
  },
  {
    path: '*',
    name: 'NotFoundPage',
    component: NotFoundPage
  }
]

const router = new VueRouter({
  routes
})

export default router
