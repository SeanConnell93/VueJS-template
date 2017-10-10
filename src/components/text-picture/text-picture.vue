
<template>
<!--==================================
=            picture left            =
===================================-->
<div :class="type" v-if="isLeft">
	<div class="row">
		<div :class="[variant.grid]">
			<div :class="type + '--img'">
				<slot v-cloak name="img"></slot>
			</div>
		</div>
		<div :class="variant.grid">
			<div :class="type + '--text'">
				<slot v-cloak name="title"></slot>
				<slot v-cloak name="text"></slot>
				<slot v-cloak name="cta"></slot>
			</div>
		</div>
	</div>
</div>



<!--===================================
=            picture right            =
====================================-->
<div :class="type" v-else-if="isRight">
	<div class="row">
		<div :class="variant.grid">
			<div :class="type + '--text'">
				<slot v-cloak name="title"></slot>
				<slot v-cloak name="text"></slot>
				<slot v-cloak name="cta"></slot>
			</div>
		</div>
		<div :class="[variant.grid]">
			<div :class="type + '--img'">
				<slot v-cloak name="img"></slot>
			</div>
		</div>
	</div>
</div>


<!--=================================
=            picture top            =
==================================-->
<div :class="variant.grid" v-else-if="isTop">
	<div :class="type">
		<div :class="type + '--img'">
			<slot v-cloak name="img"></slot>
		</div>
		<div :class="type + '--text'">
			<slot v-cloak name="title"></slot>
			<slot v-cloak name="text"></slot>
			<slot v-cloak name="cta"></slot>
		</div>
	</div>
</div>


<!--===============================
=            text only            =
================================-->
<div :class="variant.grid" v-else-if="textOnly">	
	<div :class="type">
		<div :class="type + '--text'">
			<slot v-cloak name="title"></slot>
			<slot v-cloak name="text"></slot>
			<slot v-cloak name="cta"></slot>
		</div>
	</div>
</div>

</template>

<script>



export default {

	/*----------  catch prop  ----------*/
	props: {

		variant: {
			type: Object
		}

	},


	// component name
	name: 'text-picture',

	// component data
	data () {

		return {

			type: 'picture-left',
			textOnly: false,
			isLeft: false,
			isRight: false,
			isTop: false

		}

	},

	method: {


	},

	created(){

		this.type = this.variant.type;

		switch(this.type) {
			case 'picture-top':
				this.isTop = true;
			break;
			case 'picture-right':
				this.isRight = true;
			break;
			case 'text-only':
				this.textOnly = true;
			break;
			case 'picture-left':
			default:		
				this.isLeft = true;

		}


	}


}



</script>

<style lang="scss" scoped>

.row {
	margin-left: 0;
	margin-right: 0;
}

  

</style>
