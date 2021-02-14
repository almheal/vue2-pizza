<template>
  <div class="product"
    v-if="product"
    :class="{disable: product.title === disableTitle,
    active: product.title === activeTitle}"
    @click="selectProduct"
  >
    <div class="product__header">
      <div class="product__title">
        {{product.title}}
      </div>
      <div class="features__list">
        <div class="product__feature"
          v-for="(feature, index) in product.features" :key="index"
        >
          <img class="feature__img" :src="feature.img" alt="feature">
        </div>
      </div>
    </div>
    <div class="product__description">
      {{product.description}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'HalvesProduct',
  props:{
    product:{
      type: Object,
      default: () => {}
    },
    disableTitle:{
      type: String,
      default: ''
    },
    activeTitle:{
      type: String,
      default: ''
    }
  },
  methods:{
    selectProduct(){
      if(this.product.title === this.disableTitle) return
      this.$emit('selectProduct', this.product)
    }
  }
}
</script>

<style lang="scss" scoped>
.product{
  position: relative;
  background-color: #fff;
  padding: 16px 20px;
  border-radius: 6px;
  margin-bottom: 8px;
  cursor: pointer;
  &::before{
    content: '';
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255,0.6);
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    border-radius: 6px;
  }
  &::after{
    content: '';
    width: 6px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    background-color: #009471;
    opacity: 0;
    transition: .3s;
  }
  &.active::after{
    opacity: 1
  }
  &.disable::before{
    z-index: 20;
  }
  &.disable{
    cursor: auto;
  }
}

.product__header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.product__title{
  font-size: 12px;
  font-weight: 600;
}

.product__description{
  font-size: 12px;
  color: #a69895;
  line-height: 1.4;
}

.features__list{
  display: flex;
  align-items: center;
}

.product__feature{
  width: 16px;
  height: 16px;
}

.feature__img{
  width: 100%;
  height: 100%;
}
</style>