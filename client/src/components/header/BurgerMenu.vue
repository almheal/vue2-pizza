<template>
  <button class="burger__menu" :class="{open: active}" @click.prevent="openMenu">
    <span class="burger__item" v-if="!active"></span>
    <span class="burger__item"></span>
    <span class="burger__item"></span>
  </button>
</template>

<script>
export default {
  name: 'BurgerMenu',
  props:{
    active:{
      type: Boolean,
      default: false
    }
  },
  methods:{
    openMenu(){
      this.$emit('openMenu')
    }
  }
}
</script>

<style lang="scss" scoped>
.burger__menu{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  &:hover .burger__item{
    background-color: #009471;
    transition: .3s;
  }
  &.open .burger__item:nth-child(1){
    transform: rotate(-45deg) translateX(-2px);
    margin: 0 0;
  }
  &.open .burger__item:nth-child(2){
    transform: rotate(45deg) translateX(-2px);
    margin: 0 0;
  }
}

.burger__item{
  width: 20px;
  height: 3px;
  margin: 1px 0;
  background-color: #bfb7b6;
  transition: .3s;
}
</style>