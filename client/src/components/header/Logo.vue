<template>
    <router-link class="logo__link" to="/">
      <img class="logo__img" src="../../assets/img/header/logo.svg" alt="logo">
      <span class="logo__name">Дубликат</span>
    </router-link>
</template>

<script>
export default {
  name: 'Logo'
}
</script>

<style lang="scss" scoped>
.logo__link{
  display: flex;
  align-items: center;
}

.logo__name{
  display: block;
  font-size: 20px;
  font-weight: 600;
  color: #009471;
  margin-left: 7px;
}
</style>