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
					class="navbar-toggler navbar-toggler-right" 
					type="button">
						<span></span>
						<span></span>
						<span></span>
					</button>
				</nav>

				<transition name="nav-content--hide">
				 	<div v-show="navOpen" class="nav-content">
						<ul class="nav-content-ul col-sm-8 push-sm-2">

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

		},

		centerNavOverlay: function() {

			var btn = jQuery('.navbar-toggler'),
				el = jQuery('.bubble'),
				w = btn.width(),
				y = btn.position().top + w,
				x = btn.position().left + w;

			el.offset({top: y, left: x});

		}


	},

	/*========================================
	=            life cycle hooks            =
	========================================*/
	mounted(){

		this.centerNavOverlay();

		window.addEventListener('resize', function() {

			this.centerNavOverlay();

		}.bind(this));

		new Ripple({
			element: '.nav-item',
			timeOut: 600
		});


	}

}
</script>

<style lang="scss">

//colors
$strong-blue: #0D47A1;
$light-blue: #1E88E5;
$white: #fff;


.navbar {
	min-height: 50px;
	position: relative;
	padding-right: 0px;

	&-toggler {
		top: 50%;
		transform: translateY(-50%);
		
	}

}

@keyframes Ripple {

	0% {
		transform: scale(0);
		opacity: 0.7;
	}

	100% {
		transform: scale(10);
		opacity: 0;
	}

}

.nav-content {
	position: absolute;
	z-index: 1000;
	top: 70px;
	left: 0;
	right: 0;
	transition: opacity 0.2s 0.1s;
	transition-timing-function: cubic-bezier(0.680, 0, 0.265, 1);

	&-ul {
		
		.nav-item {
			list-style-type: none;
			opacity: 0;
			transform: translateY(20px);
			transition: all 0.3s ease;
			overflow: hidden;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 15px auto;

			a.nav-link {
				color: $strong-blue;
				text-transform: uppercase;
				letter-spacing: 5px; 
				font-size: 20px;
				text-align: center;
				padding: 15px 0px;
				margin: 0px auto;
				width: 100%;
			}

			&--show {
				opacity: 1;
				transform: translateY(0px);
			}

			.ripple {
				position: absolute;
				height: 50px;
				width: 50px;
				transform: scale(0);
				animation: Ripple 0.6s ease-out;
				background-color: #ccc;
				border-radius: 50%;
				z-index: -1;
				opacity: 0;
			}
		}

	}

	&--hide {
		

		&-enter {
			display: block;
		}

		&-leave {
			opacity: 1;

			&-active {
				transition: opacity 1s ease;
			}

			&-to {
				display: none;
				opacity: 0;
			}
		}

	}

}

.navbar-wrapper {
	position: fixed;
	z-index: 1000;
	right: 0;
	left: 0;
	top: 50px;
}

// nav view effect
.bubble {
	width: 1000px;
	height: 1000px;
	transform: scale(0);
	border-radius: 50%;
	transition: all 0.4s cubic-bezier(0.000, 0.995, 0.990, 1.000);
	background-color: $white;
	position: absolute;
	z-index: 99;
	transform-origin: center center;

	&-on {
		transform: scale(3.5);
		transition-timing-function: linear;
	}

}



.navbar-inverse .navbar-nav .nav-link.router-link-exact-active {
	color: #fff;
	opacity: 1;
}



/*=====  Nav button  ======*/

.navbar-toggler:focus,
.navbar-toggler:active {
	outline: 0;
}
.navbar-toggler {
	border: none;
	height: 50px;
	width: 50px;
	padding: 10px;
	top: 0px;
	right: 0px;
	z-index: 100;
	border-radius: 50%;
	background-color: rgba($white, 1);
	box-shadow: rgba(#000, 0.3) 0px 2px 5px 0px;
	


	// nav closed
	span:nth-child(1) {
		top: 16px;
	}

	span:nth-child(2) {
		top: 24px;
	}

	span:nth-child(3) {
		top: 32px;
	}


	//nav open
	&.open {

		span {
			transition: transform 0.2s ease;
		}

		span:nth-child(1) {
			transform: rotate(135deg);
			top: 24px;
		}

		span:nth-child(2) {
			top: 24px;
			transform: scaleX(0);
		}

		span:nth-child(3) {
			top: 24px;
			transform: rotate(-135deg);
		}

	}

	span {
		background-color: $strong-blue;
		height: 2px;
		width: 60%;
		position: absolute;
		transition: transform 0.2s ease;
		left: 20%;
		right: 20%;
	}

	
}

</style>
