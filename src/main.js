// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


// reg components

import jumbotron from './components/jumbotrons'
Vue.component('jumbotron', jumbotron);

import textPicture from './components/text-picture'
Vue.component('text-picture', textPicture);

import appNav from '@/components/nav'
Vue.component('app-nav', appNav);

Vue.config.productionTip = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { 
    App,
    jumbotron,
    textPicture,
    appNav,
  },
  template: '<App/>'
})

