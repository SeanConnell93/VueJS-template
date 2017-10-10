<template>

  <div class="page-wrapper">

    <preloader></preloader>

      <jumbotron :variant="jumbotronData"></jumbotron>
      
      <div id="posts">

        <container>

          <text-picture slot="content" v-for="content in contents" :key="content.id" :variant="textVariant">
            <img class="img-fluid" slot="img" :src="src">
            <h3 slot="title">{{ content.title }}</h3>
            <p slot="text">{{ content.body }}</p>
            <div class="btn-group" slot="cta">
              <button type="button" class="mr-3 btn btn-primary">Primary</button>
              <button type="button" class="mr-3 btn btn-danger">Danger</button>
            </div>
          </text-picture>

        </container>

      </div>
  </div>
</template>

<script>

import {loadMoreData} from './../assets/js/main';

export default {

  // page name tag
  name: 'home-page',

  data () {
    return {

      jumbotronData: {
        name: 'jumbotron-full',
        src: 'https://d193o8p26ehxdy.cloudfront.net/img-thumbs/960w/CWLXKBBKIZ.jpg',
        title: 'Jumbotron Full',
        text: 'This is a jumbotron can be called with jumbotron-full.',
        cta: true,
        parallax: true
      },

      textVariant: {
        grid: 'col-md-6',
        type: 'picture-top'
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

      new loadMoreData({
        data: this.contents,
        addData: data.body
      });


    });

  },

  mounted(){



  }


}
</script>

