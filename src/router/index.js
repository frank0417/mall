import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import NewIndex from '@/components/NewIndex'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: NewIndex
    }
  ]
})
