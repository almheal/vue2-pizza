<template>
  <div class="poppup">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ProductValuesPoppup'
}
</script>

<style lang="scss" scoped>
.poppup{
  position: relative;
  max-width: 250px;
  width: 100%;
  background-color: #70544F;
  padding: 16px;
  border-radius: 6px;
  color: #fff;
  line-height: 1.3;
  &::before{
    content: '';
    position: absolute;
    left: 16px;
    bottom: -13px;
    border: 6px solid transparent;
    border-top: 7px solid #70544F;
  }
}
</style>