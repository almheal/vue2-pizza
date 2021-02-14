import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {layout: 'default'},
    component: () => import('../views/Home')
  },
  {
    path: '/constructor',
    name: 'Constructor',
    meta: {layout: 'default'},
    component: ()=> import('../views/Constructor')
  },
  {
    path: '/halves',
    name: 'Halves',
    meta: {layout: 'default'},
    component: () => import('../views/Halves')
  },
  {
    path: '/order',
    name: 'Order',
    meta: {layout: 'default'},
    component: () => import('../views/Order')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
