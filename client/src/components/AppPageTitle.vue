<template>
  <div class="page__header">
    <h4 class="header__title">{{title}}</h4>
    <div class="header__subtitle">{{subtitle}}</div>
  </div>
</template>

<script>
export default {
  name: 'AppPageTitle',
  props:{
    title: {
      type: String,
      required: true
    },
    subtitle:{
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.page__header{
  margin-bottom: 40px;
}

.header__title{
  font-family: 'Gotham';
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
}

.header__subtitle{
  font-size: 12px;
  color: #a69895;
}
</style>