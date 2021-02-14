<template>
  <div class="wrapper__triangle" :class="{hide: anim}">
    <div class="triangle"></div>
  </div>
</template>

<script>
export default {
  name: 'TriangleIcon',
  props:{
    anim:{
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper__triangle{
  position: absolute;
  right: -8px;
  top: 70%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  transition: .3s;
  &.hide{
    top: 40%;
    transform: translateY(-50%) rotate(180deg);
    transition: .3s;
  }
}

.triangle{
  border: 5px solid transparent;
  border-top: 6px solid #70544f;
}
</style>