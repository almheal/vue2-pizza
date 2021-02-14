<template>
  <div class="remove__btn" @click.prevent="btnOnClick"></div>
</template>

<script>
export default {
  name: 'BtnCross',
  methods:{
    btnOnClick(){
      this.$emit('btnOnClick')
    }
  }
}
</script>

<style lang="scss" scoped>
.remove__btn{
  width: 13px;
  height: 13px;
  cursor: pointer;
  transition: .3s;
  &::before,
  &::after{
    content: '';
    width: 14px;
    height: 2px;
    background-color: #bfb7b6;
    position: absolute;
    left: 50%;
    top: 50%;
    transition: .3s;
  }
  &::before{
    transform: translate(-50%,-50%) rotate(45deg);
  }
  &::after{
    transform: translate(-50%,-50%) rotate(-45deg);
  }
}
</style>