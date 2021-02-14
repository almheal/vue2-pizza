<template>
  <div class="tags">
    <template v-for="(tag, index) in tags">
      <div class="tag__item"
        v-if="tag.title"
        :key="index"
      >{{tag.title}}</div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'ProductTag',
  props:{
    tags:{
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.tag__item{
  position: relative;
  display: inline-block;
  font-family: 'Gotham';
  font-weight: 700;
  color: #fff;
  font-size: 12px;
  padding: 4px 10px;
  background-color: #C21313;
  &::before{
    content: '';
    position: absolute;
    right: -8px;
    top: 0;
    border: 5px solid transparent;
    border-left: 3px solid #C21313;
    border-top: 7px solid #C21313;
  }
  &::after{
    content: '';
    position: absolute;
    bottom: 0;
    right: -8px;
    border: 5px solid transparent;
    border-bottom: 7px solid #C21313;
    border-left: 3px solid #C21313;
  }
}
</style>