<template>
		
	<div v-cloak class="loader">
      <svg>
        <circle class="spinner"/>
        <circle class="spinner2"/>
        <circle class="spinner3"/>
      </svg>
    </div>

</template>

<script>


export default {


	name: 'preloader',

	methods: {

	},

	mounted () {

		

	},

	data () {
		return {
			
		}
	}


}
</script>


<style type="text/css">
	.loader[v-cloak] {
      width: 100%;
      height: 100%;
      position: fixed;
      background-color: #3F51B5;
      z-index: 9999999;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
    .loader svg {
      display: block;
      width: 300px;
      height: 300px;
      transform: rotate(-90deg);
    }
    .loader svg circle {
      fill: transparent;
      cx: 150;
      cy: 150;
      stroke-width: 2;
      stroke: #fff;
      transform-origin: 50% 50%;
      stroke-dasharray: 100%;
      -webkit-animation: spin 2s linear infinite forwards;
      animation: spin 2s linear infinite forwards;
    }
    .loader .spinner {
      r: 50;
      stroke-dashoffset: 50%;
    }
    .loader .spinner2 {
      r: 35;
      stroke-dashoffset: 75%;
    }
    .loader .spinner3 {
      r: 20;
      stroke-dashoffset: 80%;
      -webkit-animation-delay: 0.2s;
      animation-delay: 0.2s;
    }

    @-webkit-keyframes spin {
    	0% {
    		transform: rotate(0deg);
    	}
      100% {
      	transform: rotate(720deg);
      }
    }
    @keyframes spin {
    	0% {
    		transform: rotate(0deg);
    	}
      100% {
      	transform: rotate(720deg);
      }
    }
</style>

