import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'

// import pages
import home from '@/pages/home'
import about from '@/pages/about'


Vue.use(Router);

/*===============================================
=            make http requests AJAX            =
===============================================*/
Vue.use(VueResource);
/*=====  End of make http requests AJAX  ======*/



export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/about',
      name: 'about',
      component: about
    }
  ]
})
