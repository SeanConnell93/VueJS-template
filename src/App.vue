<template>
  <div id="app">
    <app-nav></app-nav>
    <router-view></router-view>
  </div>
</template>

<script>
// var JQ = require('./assets/js/jquery-3.2.1.min.js');
// var tether = require('./assets/js/tether.min.js');
// var BS = require('./assets/js/bootstrap.min.js');
var Main = require('./assets/js/main.js');



export default {

  name: 'app',
  data () {
    return {

     
      
    }
  }

}
</script>

<style lang="scss">
  @import './assets/css/main.scss'
</style>
