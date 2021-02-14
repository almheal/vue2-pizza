<template>
   <VueSlickCarousel class="slider" v-bind="settings">
    <div class="carousel__item" v-for="(slide,index) in slides" :key="index">
      <img class="slide__img" :src="require(`../assets/img/intro/${slide}`)" alt="slide">
    </div>
    </VueSlickCarousel>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  name: 'AppSlider',
  components:{
    VueSlickCarousel
  },
  props:{
    slides:{
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    settings:{
      "centerMode": true,
      "centerPadding": "400px",
      "focusOnSelect": true,
      "infinite": true,
      "slidesToShow": 1,
      "speed": 500
    }
  })
}
</script>

<style lang="scss" scoped>
.slider{
  margin-bottom: 50px;

}

.carousel__item {
  position: relative;
  height: 410px;
  width: 100%;
  padding: 0 15px;
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

.slide__img{
  width: 100%;
  border-radius: 8px;
  height: 100%;
}
</style>

<style lang="scss">
.slick-slider{
  & .slick-active .carousel__item::before{
    background-color: rgba(0,0,0,0);
    transition: .3s;
  }
}

.slick-prev{
  left: 48px;
}

.slick-next{
  right: 48px;
}

.slick-prev, .slick-next{
  background-color: #fff;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  z-index: 200;
  &:hover::before{
    color: #009471;
    transition: .3s;
  }
  &:hover{
    background-color: #fff;
  }

  &::before{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background-color: transparent;
    font-size: 24px;
    color: #a69895;
    transition: .3s;
  }
  &:focus{
    background-color: #fff;
  }
}
</style>