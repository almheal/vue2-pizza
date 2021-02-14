<template>
  <div class="wrapper__counter">
    <div class="ingredient__counter"
      :class="{active: num === count}"
      v-for="num in 2" :key="num"
      @click="changeCounter(num)"
    >
      <span>x</span>{{num}}</div>
  </div>
</template>

<script>

export default {
  name: 'ContentItemCounter',
  props:{
    count: {
      type: [Number,String],
      default: ''
    }
  },
  methods:{
    changeCounter(num){
      this.$emit('changeCounter', num)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper__counter{
  display: flex;
  width: 56px;
  height: 24px;
  border: 1px solid #e6e2e1;
  border-radius: 2px;
}

.ingredient__counter{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  color: #a69895;
  font-weight: 600;
  font-size: 12px;
  transition: .3s;
  cursor: pointer;
  &:first-child{
    border-right: 1px solid #e6e2e1;
  }
  &:hover{
    color: #9C544F;
    transition: .3s;
  }
  &.active{
    background-color: #FFD8A6;
    color: #9C544F;
    transition: .3s;
  }
}
</style>