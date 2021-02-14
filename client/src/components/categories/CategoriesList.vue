<template>
    <ul class="categories__list">
      <categories-item v-for="(category, index) in categories" :key="index" :category="category"/>
    </ul>
</template>

<script>
import CategoriesItem from '@/components/categories/CategoriesItem'

export default {
  name: 'CategoriesList',
  components:{
    CategoriesItem
  },
  props: {
    categories:{
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.categories__list{
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 25px;
  background-color: #fff;
}
</style>