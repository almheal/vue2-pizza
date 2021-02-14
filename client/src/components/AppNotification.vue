<template>
  <div class="banner">
    <div class="banner__body">
      <h4 class="banner__title">Пицца «{{title}}» добавлена в корзину</h4>
      <div class="banner__buttons">
        <app-button
          class="btn__menu"
          :name="btnMenu"
          :color="'green'"
          :background-color="'light-green'"
          @buttonOnClick="() => $router.push('/')"/>
        <app-button :name="btnArrange" @buttonOnClick="toOrderPage"/>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import AppButton from '@/components/AppButton'

export default {
  name: 'AppNotification',
  components:{
    AppButton,
  },
  props:{
    title: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    btnMenu: 'в меню',
    btnArrange: 'оформить'
  }),
  methods:{
    toOrderPage(){
      this.$router.push('/order')
    }
  }
}
</script>

<style lang="scss" scoped>
.banner{
  max-width: 850px;
  margin: 0 auto;
  width: 100%;
  background-color: #fff;
  padding: 50px 30px;
  border-radius: 6px;
}

.banner__body{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.banner__title{
  font-size: 24px;
  font-family: 'Gotham';
  font-weight: 700;
  margin-bottom: 32px;
  text-align: center;
}

.banner__buttons{
  display: flex;
  align-items: flex-start;
}

.btn__menu{
  margin-right: 16px;
}
</style>