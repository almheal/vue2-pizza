<template>
  <div class="wrapper">
    <div class="wrapper__icon reload"
      v-if="filterCount"
      @click="resetFilter"
    >
      <svg class="filter-reload">
        <use xlink:href="#filter-reload"></use>
      </svg>
    </div>
    <div class="wrapper__icon"
      :class="{active: filterCount}"
      @click="openFilter"
    >
      <svg class="filter__icon">
        <use xlink:href="#filter"></use>
      </svg>
    </div>
  </div>

</template>

<script>
export default {
  name: 'FilterIcon',
  props:{
    filterCount:{
      type: Number,
      default: 0
    }
  },
  methods:{
    openFilter(){
      this.$emit('openFilter')
    },
    resetFilter(){
      this.$emit('resetFilter')
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
  display: flex;
}

.filter__icon{
  width: 17px;
  height: 16px;
  fill: #A69895;
  transition: .3s;
}

.filter-reload{
  width: 24px;
  height: 24px;
  fill: #A69895;
}

.reload{
  &:hover{
    transform: rotate(90deg);
    transition: .3s;
  }
}

.wrapper__icon{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(0,0,0,0.07);
  transition: .3s;
  cursor: pointer;
  &:first-child{
    margin-right: 8px;
  }
  &:hover{
    background-color: rgba(0,0,0,0.1);
    transition: .3s;
  }
  &.active{
    background-color: #009471;
    transition: .3s;
  }
  &.active .filter__icon{
    fill: #fff;
    transition: .3s;
  }
}
</style>