<template>
  <div class="categories">
    <div class="category__item"
      :class="{active : category.title === activeCategory.title}"
      v-for="(category, index) in categories" :key="index"
      @click="changeCategory(category)"
    >{{category.title}}</div>
  </div>
</template>

<script>
export default {
  name: 'ConstructorCategories',
  props:{
    categories:{
      type: Array,
      default: () => []
    },
    activeCategory:{
      type: Object,
      default: () => {}
    }
  },
  methods:{
    changeCategory(category){
      this.$emit('changeCategory', category)
    }
  }
}
</script>

<style lang="scss" scoped>
.categories{
  display: flex;
  border-bottom: 3px solid #efeeee;
  margin-bottom: 24px;
}

.category__item{
  position: relative;
  margin-right: 30px;
  font-size: 12px;
  font-weight: 600;
  padding-bottom: 10px;
  cursor: pointer;
  transition: .3s;
  &:last-child{
    margin-right: 0;
  }
  &::after{
    content: '';
    width: 100%;
    height: 3px;
    background-color: #009471;
    position: absolute;
    left: 0;
    bottom: -3px;
    opacity: 0;
    transition: .3s;
  }
  &.active{
    color: #009471;
    &::after{
      opacity: 1;
      transition: .3s;
    }
  }
  &:hover{
    color: #009471;
    transition: .3s;
  }
  &:hover::after{
    opacity: 1;
    transition: .3s;
  }
}
</style>