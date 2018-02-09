<template>

  <div class="page-wrapper">

    <jumbotron :variant="jumbotronData">
      <div class="container" slot="content">
        <h1 class="jumbotron-heading">Jumbotron full</h1>
        <p class="lead">This can be called by name: jumbotron-full</p>
        <button type="button" class="btn btn-success btn-lg">Primary</button>
      </div>
    </jumbotron>

    <div class="container" id="posts">

        <text-picture slot="content" v-for="content in contents" :key="content.id" :variant="textVariant" :index="content.id">

          <img class="img-fluid" slot="img" :src="src">
          <h3 slot="title">{{ content.title }}</h3>
          <p slot="text">{{ content.body }}</p>

          <div class="btn-group" slot="cta">
            <router-link class="mr-3" :to="textVariant.ctaUrl">
              <button type="button" class="btn btn-primary">{{ textVariant.ctaText }}</button>
            </router-link>
            <router-link :to="textVariant.ctaUrl">
              <button type="button" class="btn btn-outline-primary">secondary</button>
            </router-link>
          </div>

        </text-picture>

    </div>
  </div>
</template>

<script>

// import {loadMoreData} from './../assets/js/main';

export default {

  // page name tag
  name: 'home',

  data () {
    return {

      jumbotronData: {
        name: 'jumbotron-full',
        src: 'https://d193o8p26ehxdy.cloudfront.net/img-thumbs/960w/CWLXKBBKIZ.jpg',
        parallax: true
      },

      textVariant: {
        grid: 'col-md-6',
        type: 'picture-left',
        ctaUrl: '/about',
        ctaText: 'Primary'
      },

      contents: [],

      src: 'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/KPMRVAREV0.jpg'

    }
  },
  methods: {


  },

  created(){

    this.$http.get('https://jsonplaceholder.typicode.com/posts').then( function(data) {

      this.contents = data.body.slice(0, 10);


    });

  },

  mounted(){



  }


}
</script>


<style lang="scss">

  

</style>



