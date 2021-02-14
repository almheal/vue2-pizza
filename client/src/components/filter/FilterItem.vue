<template>
  <li class="filter__item"
    :class="{actived : filterItem.active, disabled : filterItem.disable}"
    @click="selectItem"
  >
    <svg class="filter__icon">
      <use xlink:href="#mark"></use>
    </svg>
    {{filterItem.title}}
  </li>
</template>

<script>
export default {
  name: 'FilterItem',
  props:{
    filterItem:{
      type: Object,
      default: () => {}
    }
  },
  methods:{
    selectItem(){
      this.$emit('selectItem', this.filterItem)
    }
  }
}
</script>

<style lang="scss" scoped>
.filter__item{
  position: relative;
  padding: 5px 15px 5px 30px;
  margin-bottom: 5px;
  text-transform: lowercase;
  cursor: pointer;
  transition: .3s;
  &:hover{
    background-color: #F8F8F8;
    transition: .3s;
  }
  &:hover .filter__icon{
    opacity: 1;
    transition: .3s;
  }
  &.actived{
    color: #009471;
    transition: .3s;
  }
  &.actived:hover{
    background-color: transparent;
  }
  &.actived .filter__icon{
    opacity: 1;
    fill: #009471;
    transition: .3s;
  }
  &.disabled{
    cursor: default;
    text-decoration: line-through;
    color: #e6e2e1;
  }
  &.disabled:hover{
    background-color: transparent;
  }
  &.disabled:hover .filter__icon{
    opacity: 0;
  }
  &.disabled::selection{
    background-color: transparent;
  }
}

.filter__icon{
  position: absolute;
  display: block;
  width: 16px;
  height: 16px;
  fill: #bfb7b6;
  opacity: 0;
  left: 7px;
  top: 50%;
  transform: translateY(-50%);
  transition: .3s;
}
</style>