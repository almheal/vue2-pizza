<template>
  <div class="wrapper">
    <div class="feature" v-for="(feature, index) in features" :key="index">
      <img class="feature__icon" :src="feature.img" alt="feature-icon">
      <div class="wrapper__poppup">
        <ProductValuesPoppup>
          {{feature.title}}
        </ProductValuesPoppup>
      </div>
    </div>
  </div>
</template>

<script>
import ProductValuesPoppup from '@/components/product/ProductValuesPoppup'

export default {
  name:'ProductFeature',
  components:{
    ProductValuesPoppup
  },
  props:{
    features:{
      type: Array,
      default: () => []
    }
  },
}
</script>

<style lang="scss" scoped>
.feature{
  position: relative;
  margin-right: 8px;
  &:hover .wrapper__poppup{
    opacity: 1;
    z-index: 50;
    transition: .3s;
  }
}

.wrapper__poppup{
  position: absolute;
  left: -13px;
  top: -60px;
  z-index: -100;
  opacity: 0;
  transition: .3s;
}

.feature__icon{
  width: 16px;
  height: 16px;
}
</style>