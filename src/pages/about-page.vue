<template>
  <div class="page-wrapper">

    <jumbotron :variant="jumbotronData">
      <div class="container" slot="content">
        <h1 class="jumbotron-heading">Jumbotron auto</h1>
        <p class="lead">This can be called by name: jumbotron-auto</p>
      </div>
    </jumbotron>

    <container>

      <text-picture slot="content" v-for="content in contents" :key="content.id" :variant="textVariant">
        <h3 slot="title">{{ content.title }} <small>{{ date }}</small> </h3>
        <p slot="text">{{ content.body }}</p>
      </text-picture>

    </container>

  </div>
</template>

<script>

import { loadMoreData } from './../assets/js/main.js';

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


    var self = this;
    var load = new loadMoreData({
      dataContainer: this.contents,
      url: 'https://jsonplaceholder.typicode.com/posts'
    }, function() {


      var have = self.contents.length + 1,
          need = have + 10;
      for (have; have < need; have++) {
        self.$http.get('https://jsonplaceholder.typicode.com/posts/' + have).then( res => {

          if ( res.status === 200 ) {
            // console.log(res.body);
            self.contents.push( res.body );

            // sort the order by id
            self.contents.sort(function(a, b){
              return a.id - b.id;
            });

            load.isRequesting = false;
          } 

        }).catch( res => {

          console.log('404');

        });

      }

    });

    



  },

  route: {

    canReuse: false

  }
}
</script>

