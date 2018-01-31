<template>
  <transition name="fade">
    <div id="404">
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <h1>404 :(</h1>
          </div>
        </div>
      </div>
      
    </div>
  </transition>
</template>

<script>
import textPicture from '../components/text-picture/text-picture.vue'

export default {
  components: {
    'text-picture': textPicture
  },
  name: 'home-page',
  data () {
    return {
      
    }
  },
  methods: {

    

  }
}
</script>

<style lang="scss">


</style>
