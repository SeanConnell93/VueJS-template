<template>
  <div class="container">
	<div class="row">
		<slot name="loop">
			<slot name="content"></slot>
		</slot>
	</div>  
  </div>
</template>

<script>



export default {

	// component name
	name: 'container'

}


</script>

<style lang="scss">

  

</style>
