<template>
  <div class="list">
    <halves-product
      v-for="(product,index) in products" :key="index"
      :product="product"
      :disableTitle="disableTitle"
      :activeTitle="activeTitle"
      @selectProduct="selectProductHandler"
    />
  </div>
</template>

<script>
import HalvesProduct from '@/components/halves/HalvesProduct'

export default {
  name: 'HalvesList',
  components:{
    HalvesProduct
  },
  props:{
    products:{
      type: Array,
      default: () => []
    },
    disableTitle:{
      type: String,
      default:''
    },
    activeTitle:{
      type: String,
      default: ''
    }
  },
  methods:{
    selectProductHandler(product){
      this.$emit('selectProductHandler', product)
    }
  }
}
</script>

<style lang="scss" scoped>
.list{
  max-width: 264px;
  padding-right: 5px;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>