<template>
  <div class="product__variety">
    <div class="variety__item"
      v-for="(variety,index) in variety" :key="index"
      :class="{active: variety.title === activeProduct.variety.title}"
      @click="changeVariety(variety)"
    >
      {{variety.title}}
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ProductVariety',
  props:{
    variety: {
      type: Array,
      default: () => []
    },
    activeProduct:{
      type: Object,
      default: () => {}
    }
  },
  methods:{
    ...mapActions({
      changeVarietyProduct: 'product/changeVarietyProduct',
    }),
    async changeVariety(variety){
      await this.changeVarietyProduct({product: this.activeProduct, variety})
      this.$emit('changeVariety', variety)
    }
  },
}
</script>

<style lang="scss" scoped>
.product__variety{
  display: flex;
  border: 1px solid #ededed;
  border-radius: 100px;
  margin-bottom: 8px;
}


.variety__item{
  width: 100%;
  text-align: center;
  padding: 10px 5px;
  border-radius: 100px;
  &.active{
    background-color: #EDEDED;
    color: #70544f;
  }
}
</style>