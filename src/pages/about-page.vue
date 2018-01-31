<template>
  <div class="page-wrapper">

    <jumbotron :variant="jumbotronData">
      <div class="container" slot="content">
        <h1 class="jumbotron-heading">Jumbotron auto</h1>
        <p class="lead">This can be called by name: jumbotron-auto</p>
      </div>
    </jumbotron>

    <container>
      <div class="ml-3 mb-5 bg-success text-white p-2" slot="content">
        <h1 >Dynamicly loading content</h1>
        <p>Content loading from <a class="text-white" target="_blank" href="https://jsonplaceholder.typicode.com/">jsonplaceholder.typicode.com</a></p>
      </div>
    </container>

    <container>

      <text-picture slot="content" v-for="content in contents" :key="content.id" :variant="textVariant">
        <h3 slot="title">{{ content.title }} <small>{{ date }}</small> </h3>
        <p slot="text">{{ content.body }}</p>
      </text-picture>

    </container>

  </div>
</template>

<script>

import { loadMoreData, Appear } from './../assets/js/main.js';

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

  computed: {

    date: function() {

      var d = new Date(),
          month = d.getUTCMonth() + 1;

      return d.getUTCDate() + '/' + month + '/' + d.getUTCFullYear();

    }


  },


  created(){

    // first loaded content 
    this.$http.get('https://jsonplaceholder.typicode.com/posts').then( res => {

      this.contents = res.body.slice(0, 10);

    });


    var load = new loadMoreData({
      dataContainer: this.contents,
      url: 'https://jsonplaceholder.typicode.com/posts'
    }, function() {


      var have = this.contents.length + 1,
          need = have + 10;
      for (have; have < need; have++) {
        this.$http.get('https://jsonplaceholder.typicode.com/posts/' + have).then( res => {

          if ( res.status === 200 ) {
            // console.log(res.body);
            this.contents.push( res.body );

            // sort the order by id
            this.contents.sort(function(a, b){
              return a.id - b.id;
            });

            load.isRequesting = false;
          } 

        }).catch( res => {

          console.log('404');

        });

      }

    }.bind(this));

    
    var appearEffect = new Appear({
      element: '.col-md-6',
      addClass: 'appear-effect'
    });



  },

  route: {

    canReuse: false

  }
}
</script>



<style lang="scss">

  .col-md-6 {
    opacity: 0;
    transition: all 0.4s ease;
    transform: translate3d(0px, 50px, 0px);
  }

  .col-md-6.appear-effect, .col-md-6:nth-of-type(-n+4) {
    opacity: 1;
    transform: translate3d(0px, 0px, 0px);
  }

</style>
