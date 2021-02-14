<template>
  <div class="counter">
    <div class="circle minus" @click="decrementProduct">-</div>
    <div class="count">{{count}}</div>
    <div class="circle plus" @click="incrementProduct">+</div>
  </div>
</template>

<script>
export default {
  name: 'BasketCounter',
  props:{
    count: {
      type: [String,Number],
      default: ''
    }
  },
  methods:{
    decrementProduct(){
      this.$emit('decrementProduct')
    },
    incrementProduct(){
      this.$emit('incrementProduct')
    }
  }
}
</script>

<style lang="scss" scoped>
.counter{
  display: flex;
}

.circle{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #E1FAF4;
  font-weight: 600;
  font-size: 16px;
  color: #009471;
  transition: .3s;
  cursor: pointer;
  &.disable{
    background-color: #EDEDED;
    color: #bfb7b6;
    transition: .3s;
  }
}

.count{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
}
</style>