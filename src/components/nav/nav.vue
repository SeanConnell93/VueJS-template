<template>
	<!-- wrapper open -->
	<div class="navbar-wrapper container">

		<div class="row">

			<div class="col-sm-12">

				<div class="bubble" :class="{'bubble-on': navOpen}"></div>
			
				<!-- Nav button -->
				<nav class="navbar">
					<button 
					@click="[navToggle()]" 
					:class="{ 'open': navBtnOpen }" 
					class="navbar-toggler" 
					type="button">
						<span></span>
						<span></span>
						<span></span>
					</button>
				</nav>

				<transition name="nav-content--hide">
				 	<div v-show="navOpen" class="nav-content">
						<ul class="nav-content-ul col-sm-12">

							<li v-for="link in links" class="nav-item">
								<router-link 
									class="nav-link" 
									@click.native="[navToggle()]"
									:to="link.url" 
									exact>
										{{ link.text }}
								</router-link>
							</li>

						</ul>
					</div>
				</transition>

			</div>

		 </div>

	</div> <!-- wrapper close -->


</template>

<script>
import {PopIn, Ripple} from './../../assets/js/main';

export default {
	name: 'app-nav',

	data() {

		return {
			navOpen: false,
			navBtnOpen: false,

			linkEffect: new PopIn({
				element: '.nav-item',
				addClass: 'nav-item--show',
				hasClass: '.nav-content--hide',
				delay: 150
			}),

			links: [
		
				{
					url: '/',
					text: 'Home'
				},
				{
					url: '/about',
					text: 'About'
				},
				{
					url: '/news',
					text: 'News'
				}
			]

		}

	},

	methods: {

		navToggle: function(){

			var timeOut = ( this.navOpen ) ? 500 : 0; 

			setTimeout(function() {

				this.navOpen = !this.navOpen;

			}.bind(this), timeOut);
			this.navBtnOpen = !this.navBtnOpen;
			this.linkEffect.run();

		}


	},

	/*========================================
	=            life cycle hooks            =
	========================================*/
	mounted(){

		new Ripple({
			element: '.nav-item',
			timeOut: 600
		});


	}

}
</script>

