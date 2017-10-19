<template>
  <div class="page-wrapper">

    <preloader></preloader>

    <jumbotron :variant="jumbotronData">
      <div class="container" slot="content">
        <h1 class="jumbotron-heading">Jumbotron auto</h1>
        <p class="lead">This can be called by name: jumbotron-auto</p>
      </div>
    </jumbotron>

    <container>

      <text-picture slot="content" v-for="content in contents" :key="content.id" :variant="textVariant">
        <h3 slot="title">{{ content.title }}</h3>
        <p slot="text">{{ content.body }}</p>
      </text-picture>

    </container>

  </div>
</template>

<script>

export default {

  name: 'about',

  data () {
    return {

      jumbotronData: {
        name: 'jumbotron-auto',
        src: 'https://d193o8p26ehxdy.cloudfront.net/img-thumbs/960w/LBOGQME99N.jpg',
      },
      
      textVariant: {
        type: 'text-only',
        grid: 'col-md-6'
      },

      contents: []


    }
  },
  methods: {

    

  },


  created(){


    this.$http.get('https://jsonplaceholder.typicode.com/posts').then( function(data) {

      this.contents = data.body.slice(0, 10);

    });


  }
}
</script>

