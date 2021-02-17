<template>
  <div class="wrapper__slider">
    <button class="carousel__btn prev" @click="prevSlide">
      <svg class="arrow-icon">
        <use xlink:href="#arrow-left"></use>
      </svg>
    </button>
    <VueSlickCarousel class="slider" v-bind="settings" ref="carousel" lazyLoad="true">
      <div class="carousel__item" v-for="(slide,index) in slides" :key="index">
        <img class="slide__img" :src="require(`../assets/img/intro/${slide}`)" alt="slide"/>
      </div>
    </VueSlickCarousel>
    <button class="carousel__btn next" @click="nextSlide">
      <svg class="arrow-icon">
        <use xlink:href="#arrow-right"></use>
      </svg>
    </button>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  name: 'AppSlider',
  components:{
    VueSlickCarousel,
  },
  props:{
    slides:{
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    settings:{
      "arrows": false,
      "centerMode": true,
      "centerPadding": "400px",
      "focusOnSelect": true,
      "infinite": true,
      "slidesToShow": 1,
      "speed": 500,
    }
  }),
  methods:{
    prevSlide(){
      this.$refs.carousel.prev()
    },
    nextSlide(){
      this.$refs.carousel.next()
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper__slider{
  position: relative;
}

.slider{
  margin-bottom: 50px;

}

.carousel__item {
  position: relative;
  height: 410px;
  width: 100%;
  padding: 0 15px;
  background-color: #fff;
  border-radius: 8px;
  &::before{
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
    background-color: rgba(255,255,255,0.4);
    transition: .3s;
  }
}

.carousel__slide {
  padding: 10px;
}

.custom__arrow{
  width: 100px;
  height: 100px;
  background-color: red;
}

.slide__img{
  width: 100%;
  border-radius: 8px;
  height: 100%;
}

.carousel__btn{
  position: absolute;
  top: 50%;
  left: 48px;
  transform: translateY(-50%);
  width: 48px !important;
  height: 48px !important;
  border-radius: 50%;
  z-index: 200;
  &::before{
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 50%;
    background-color: #fff;
    transition: .3s;
  }
  &.next{
    left: initial;
    right: 48px;
  }
  &:hover .arrow-icon{
    fill: #009471;
    transition: .3s;
  }
  &:hover::before{
    transform: scale(1.05);
    transition: .3s;
  }
}

.arrow-icon{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  width: 16px;
  height: 16px;
  fill: #a69895;
  transition: .3s;
}

</style>

<style lang="scss">
.slick-slider{
  & .slick-active .carousel__item::before{
    background-color: rgba(0,0,0,0);
    transition: .3s;
  }
}
</style>