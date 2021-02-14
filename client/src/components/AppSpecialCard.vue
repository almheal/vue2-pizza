<template>
  <div class="pizza__card">
    <div class="card__top">
      <div class="card__title">{{title}}</div>
      <div class="wrapper__img">
        <v-lazy-image class="card__img" :src="require(`../assets/img/${img}`)" alt="create-pizza"/>
      </div>
    </div>
    <div class="card__bottom">
      <app-button
        class="special__btn"
        :name="btnName"
        :color="'green'"
        :backgroundColor="'light-green'"
        @buttonOnClick="() => $router.push(to)"/>
      <div class="card__description">{{description}}</div>
    </div>
  </div>
</template>

<script>
import AppButton from '@/components/AppButton'
import VLazyImage from 'v-lazy-image'

export default {
  name: 'AppSpecialCard',
  components:{
    AppButton,
    VLazyImage
  },
  props:{
    title:{
      type: String,
      default: ''
    },
    img: {
      type: String,
      default: ''
    },
    btnName:{
      type: String,
      default: ''
    },
    description:{
      type: String,
      default: ''
    },
    to:{
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.pizza__card{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 32.2%;
  background-color: #fff;
  margin: 0 5px 10px;
  padding: 32px 24px 35px;
  text-align: center;
  border-radius: 6px;
}

.card__title{
  font-family: 'Gotham';
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 8px;
}

.wrapper__img{
  max-width: 240px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  height: 190px;
}

.card__img{
  width: 100%;
}

.card__description{
  color: #a69895;
}

.special__btn{
  margin-bottom: 50px;
}
</style>