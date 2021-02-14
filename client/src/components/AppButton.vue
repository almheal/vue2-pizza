<template>
  <button class="product__btn"
    :class="{'color-green': color === 'green', 'background-light-green': backgroundColor === 'light-green'}"
    @click.prevent="buttonOnClick"
    :disabled="disable"
  >{{name}}</button>
</template>

<script>
export default {
  name: 'AppButton',
  props:{
    name:{
      type: String,
      default: ''
    },
    disable: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: ''
    },
    backgroundColor: {
      type: String,
      default: ''
    }
  },
  methods:{
    buttonOnClick(){
      if(this.disable) return
      this.$emit('buttonOnClick')
    }
  }
}
</script>

<style lang="scss" scoped>
.product__btn{
  position: relative;
  font-family: 'Gotham';
  font-weight: 700;
  z-index: 20;
  display: inline-block;
  padding: 15px 25px;
  border-radius: 24px;
  color: #fff;
  font-size: 14px;
  text-transform: uppercase;
  &:hover::before{
    transform: scale(1.07);
    transition: .3s;
  }
  &::before{
    content: '';
    width: 100%;
    height: 100%;
    border-radius: 24px;
    background-color: #009471;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    transition: .3s;
  }
  &.color-green{
    color: #009471;
  }
  &.background-light-green::before{
    background-color: #e1faf4;
  }
}

button[disabled]{
  color: #bfb7b6;
  cursor: default;
  &::before{
    background-color: #f8f8f8;
  }
}
</style>