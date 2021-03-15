import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookie from 'js-cookie'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    component:() => import('../views/home/home.vue')
  },
  {
    path:'/shop',
    component: () => import('../views/shop/shop.vue')
  },
  {
    path:'/user',
    component:() => import('@/views/user/user.vue')
  },
  {
    path:'/addshop',
    component:() => import('@/views/other/addshop.vue')
  },
  {
    path:'/editshop',
    component:() => import('@/views/other/editshop.vue')
  },
  
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  //to 将要访问的路径
  //from 代表从哪个路径跳转而来
  //next 是一个函数，表示放行
  //  next() 放行    next('/login') 强制跳转
  // console.log(to)
  // console.log(from)
  if (to.path === '/') return next()
  let login = JSON.parse(Cookie.get('login'))
  if (!login) return next('/')
  next()
})

export default router
