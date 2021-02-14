<template>
  <li class="category__item">
    <v-lazy-image class="category__icon" :src="category.img" alt="category-icon"/>
    <div class="category__title">{{category.title}}</div>
  </li>
</template>

<script>
import VLazyImage from 'v-lazy-image'

export default {
  name: 'CategoryItem',
  components:{
    VLazyImage
  },
  props: {
    category: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.category__icon{
  margin-bottom: 10px;
}

.category__item{
  flex: 0 0 11.11111%;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  &:hover .category__title{
    color: #009471;
    transition: .3s;
  }
}

.category__title{
  font-family: 'Gotham';
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
  transition: .3s;
}
</style>