<template>
  <div class="person">
    <img class="person__icon" src="../../assets/img/user.svg" alt="persons"/>
    <div class="person__item">{{persons}}</div>
    <div class="wrapper__poppup">
      <ProductValuesPoppup>Количество персон</ProductValuesPoppup>
    </div>
  </div>
</template>

<script>
import ProductValuesPoppup from '@/components/product/ProductValuesPoppup'

export default {
  name: 'ProductPerson',
  components:{
    ProductValuesPoppup
  },
  props:{
    persons:{
      type: [Number,String],
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.person{
  position: relative;
  display: flex;
  align-items: center;
  &:hover .wrapper__poppup{
    opacity: 1;
    z-index: 500;
    transition: .3s;
  }
}

.person__icon{
  width: 16px;
  height: 16px;
}

.person__item{
  color: #BFB7B6;
  margin-left: 7px;
}

.wrapper__poppup{
  width: 170px;
  position: absolute;
  left: -14px;
  bottom: 31px;
  z-index: -500;
  opacity: 0;
  transition: .3s;
}
</style>