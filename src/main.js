import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

/*===============================================
=            make http requests AJAX            =
===============================================*/

Vue.use(VueResource);

/*=====  End of make http requests AJAX  ======*/



/*----------  declare components here  ----------*/
import appNav from './components/nav/nav.vue'
import container from './components/container/container.vue'
import textPicture from './components/text-picture/text-picture.vue'
import jumbotron from './components/jumbotron/jumbotrons.vue'
import preloader from './components/preloader/preloader.vue'

Vue.component('app-nav', appNav);
Vue.component('jumbotron', jumbotron);
Vue.component('text-picture', textPicture);
Vue.component('container', container);
Vue.component('preloader', preloader);


/*---------- end components  ----------*/


/*----------  declare Routes here  ----------*/
import Routes from './routers'

const router = new VueRouter({
	routes: Routes,
	mode: 'history',
	// return scroll position to the top when new page is visited
	scrollBehavior (to, from, savedPosition) {
	  return { x: 0, y: 0 }
	}
});

Vue.use(VueRouter);

/*----------  end Routes  ----------*/



/*----------  declare directive here  ----------*/
Vue.directive('switch', {

	bind(el, binding, vnode){

	}

});

/*----------  end directive  ----------*/




new Vue({
  el: '#app',
  render: h => h(App),
  router: router
})
