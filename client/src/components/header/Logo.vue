<template>
    <router-link class="logo__link" to="/">
      <img class="logo__img" src="../../assets/img/header/logo.svg" alt="logo">
      <span class="logo__name" :class="{'fz-18': activeFixed}">Дубликат</span>
    </router-link>
</template>

<script>
export default {
  name: 'Logo',
  props:{
    activeFixed:{
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.logo__link{
  display: flex;
  align-items: center;
  height: 100%;
}

.logo__name{
  display: block;
  font-size: 20px;
  font-weight: 600;
  color: #009471;
  margin-left: 7px;
  &.fz-18{
    font-size: 18px;
  }
}

.logo__img{
  height: 100%;
}
</style>