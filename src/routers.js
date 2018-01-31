import homaePage from './pages/home-page.vue'
import aboutPage from './pages/about-page.vue'
import notFound from './pages/not-found.vue'

export default [

	{
		path: '/',
		component: homaePage
	}, 
	{
		path: '/about',
		component: aboutPage
	},
	{
		path: '*',
		component: notFound
	}

]

