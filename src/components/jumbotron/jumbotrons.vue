<template>
		
		<div :class="[{'jumbotron-wrapper': variant.parallax}, variant.name]" 
					class="jumbotron jumbotron-fluid">

			<div :class="{'element-container': variant.parallax}" 
						class="jumbotron-bg" 
						:style="{ 'background-image': 'url(' + variant.src + ')' }">
			</div>

			<div class="container">

				<h1 class="display-4">{{ variant.title }}</h1>
				<p class="lead">{{ variant.text }}</p>
				<button v-if="variant.cta" type="button" class="btn btn-primary btn-lg">Primary</button>

			</div>
			
			<svg v-if="variant.name === 'jumbotron-half'" class="angle" viewBox="0 0 100 100" preserveAspectRatio="none">
			  <path vector-effect="non-scaling-stroke" d="M100 100 L0 100 L100 0 Z" />
			</svg>
		</div>

</template>

<script>

import {SlowBgEffect} from './../../assets/js/main';

export default {


	name: 'jumbotron',

	/*----------  catch prop  ----------*/
	props: {

		variant: {
			type: Object
		}

	},


	methods: {

	},

	mounted () {

		// init a slow bg effect if parallax is true
		if ( this.variant.parallax ) {

			new SlowBgEffect({
				slowDown: 5,
				element: '.element-container',
				container: '.jumbotron-wrapper'
			});

		}

	},

	data () {
		return {
			
		}
	},

	route: {

		canReuse: false

	}


}
</script>

<style lang="scss">




</style>
