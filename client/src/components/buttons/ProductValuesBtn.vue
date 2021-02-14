<template>
  <div class="value__btn" v-if="values.length">
    <div class="btn__line"></div>
    <div class="wrapper__poppup">
      <ProductValuesPoppup>
        <div class="poppup__title">Пищевая ценность продукта на 100 г</div>
        <ul class="values__list">
          <li class="list__item" v-for="(item,index) in values" :key="index">{{item.title}} - {{item.value}}</li>
        </ul>
      </ProductValuesPoppup>
    </div>
  </div>
</template>

<script>
import ProductValuesPoppup from '@/components/product/ProductValuesPoppup'

export default {
  name: 'ProductValuesBtn',
  components:{
    ProductValuesPoppup
  },
  props:{
    values:{
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.value__btn{
  position: absolute;
  right: 24px;
  top: 0;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid #bfb7b6;
  transition: .3s;
  &:hover{
    border-color: #807573;
    transition: .3s;
  }
  &:hover::before{
    border-color: #807573;
    transition: .3s;
  }
  &:hover::after{
    background-color: #807573;
    transition: .3s;
  }
  &:hover .wrapper__poppup{
    opacity: 1;
    z-index: 500;
    transition: .3s;
  }
  &::before{
    content: '';
    width: 6px;
    height: 0px;
    // background-color: #A69895;
    border: 1px solid #bfb7b6;
    position: absolute;
    top: 9px;
    left: 5px;
    transform: rotate(90deg);
    transition: .3s;
  }
  &::after{
    content: '';
    width: 2px;
    height: 2px;
    background-color: #bfb7b6;
    border-radius: 50%;
    position: absolute;
    top: 3px;
    left: 50%;
    transform: translateX(-50%);
    transition: .3s;
  }
}

.poppup__title{
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 12px;
}

.wrapper__poppup{
  position: absolute;
  left: -14px;
  bottom: 31px;
  z-index: -500;
  width: 250px;
  opacity: 0;
  transition: .7s;
}

.list__item{
  margin-bottom: 2px;
  &:last-child{
    margin-bottom: 0;
  }
}
</style>