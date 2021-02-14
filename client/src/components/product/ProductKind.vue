<template>
  <div class="product__size">
    <div class="size__item"
      :class="{active: kind.size === activeKind.size}"
      v-for="(kind, index) in kinds" :key="index"
      @click="changeKind(kind)"
    >
      {{kind.size}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductKind',
  props:{
    kinds:{
      type: Array,
      default: () => []
    },
    activeKind:{
      type: Object,
      default: () => {}
    }
  },
  methods:{
    changeKind(kind){
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