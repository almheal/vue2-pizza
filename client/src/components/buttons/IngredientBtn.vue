<template>
  <button class="ingredients__btn" @click="openItem">
    <span class="btn__line"></span>
    <div class="counter" v-if="counter">{{counter}}</div>
  </button>
</template>

<script>
export default {
  name: 'IngredientBtn',
  props:{
    counter:{
      type: [Number,String],
      default: ''
    }
  },
  methods:{
    openItem(){
      this.$emit('openItem')
    }
  }
}
</script>

<style lang="scss" scoped>
.ingredients__btn{
  position: relative;
  display: block;
  width: 32px;
  height: 32px;
  background-color: #fff;
  border-radius: 50%;
  border: 1px solid #DFF2ED;
}

.counter{
  position: absolute;
  right: -4px;
  top: -2px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c21313;
  font-size: 10px;
  color: #fff;
  border-radius: 50%;
  min-height: 16px;
  min-width: 16px;
}

.btn__line{
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 12px;
  height: 2px;
  background-color: #009471;
  transform: translate(-50%,-50%);
  &::before,
  &::after{
    content: '';
    width: 16px;
    height: 2px;
    background-color: #009471;
    position: absolute;
    top: -5px;
    left: -2px;
  }
  &::after{
    top: 5px;
    width: 8px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>