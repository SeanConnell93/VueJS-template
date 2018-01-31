<template>

<!--====================================
=            jumbotron-full            =
=====================================-->

<div id="jumbotron-wrapper" :class="variant.name" class="jumbotron jumbotron-fluid">

	<div :class="[{'element-container': variant.parallax}, 'jumbotron-bg']" :style="{ 'background-image': 'url(' + variant.src + ')' }">
	</div>

	<slot name="content"></slot>

	<svg v-if="variant.name === 'jumbotron-auto'" class="angle" viewBox="0 0 100 100" preserveAspectRatio="none">
	  <path vector-effect="non-scaling-stroke" d="M100 100 L0 100 L100 0 Z" />
	</svg>

</div>


<!--====  End of jumbotron-full  ====-->


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
				slowDown: 3,
				element: '.element-container',
				container: '#jumbotron-wrapper'
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
