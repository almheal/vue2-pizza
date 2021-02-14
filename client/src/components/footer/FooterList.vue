<template>
  <ul class="footer__list">
    <li class="list__item" v-for="(item, index) in list" :key="index">
      <router-link class="item__link" :to="item.to">{{item.title}}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'FooterList',
  props:{
    list:{
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.item__link{
  display: block;
  font-weight: 500;
  padding: 5px 0;
  font-size: 16px;
  color: #70544f;
  transition: .3s;
  &:hover{
    color: #009471;
    transition: .3s;
  }
}
</style>