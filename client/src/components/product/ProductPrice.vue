<template>
  <div class="product__price">{{price}} <span>₽</span></div>
</template>

<script>
export default {
  name: 'ProductPrice',
  props:{
    price:{
      type: [Number,String],
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.product__price{
  font-weight: 600;
  font-size: 18px;
  & span{
    font-weight: 400;
  }
}
</style>