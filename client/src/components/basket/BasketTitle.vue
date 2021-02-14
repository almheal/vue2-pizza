<template>
  <div class="basket__title" @click="hideItems">
    {{title}} <span v-if="count">({{count}})</span>
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'BasketTitle',
  props:{
    showItems:{
      type: Boolean
    },
    title: {
      type: String,
      default: ''
    },
    count:{
      type: Number,
      default: 0
    }
  },
  methods:{
    hideItems(){
      this.$emit('hideItems')
    }
  }
}
</script>

<style lang="scss" scoped>
.basket__title{
  display: inline-block;
  position: relative;
  font-size: 18px;
  font-family: 'Gotham';
  font-weight: 700;
  padding-right: 15px;
  cursor: pointer;
  transition: .3s;
  & span{
    color: #a69895;
    font-family: 'Roboto';
    font-weight: 400;
  }
  &.cursor-default{
    cursor: initial;
  }
  &.color-grey{
    color: #e6e2e1;
    &:hover{
      color: #a3827c;
      transition: .3s;
    }
  }
}
</style>