<template>
  <div class="product__size">
    <div class="size__item"
      :class="{active: kind.size === activeProduct.kind.size}"
      v-for="(kind, index) in kinds" :key="index"
      @click="changeKind(kind)"
    >
      {{kind.size}}
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ProductKind',
  props:{
    kinds:{
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
      changeKindProduct: 'product/changeKindProduct'
    }),
    async changeKind(kind){
      await this.changeKindProduct({product: this.activeProduct, kind})
      this.$emit('changeKind', kind)
    }
  }
}
</script>

<style lang="scss" scoped>
.product__size{
  display: flex;
  border: 1px solid #ededed;
  border-radius: 100px;
  margin-bottom: 24px;
}


.size__item{
  border-radius: 100px;
  width: 100%;
  text-align: center;
  padding: 10px 5px;
  &.active{
    background-color: #EDEDED;
  }
}
</style>