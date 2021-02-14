<template>
  <div class="language">
    <button class="language__item">
      Ru
    </button>
  </div>
</template>

<script>
export default {
  name: 'Language'
}
</script>

<style lang="scss" scoped>
.language{
  box-shadow: 0 2px 12px 0 rgba(41,44,51,.2);
  border-radius: 5px;
}

.language__item{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  color: #bfb7b6;
  font-size: 16px;
  font-weight: 600;
  transition: .3s;
  &:hover{
    color: #009471;
    transition: .3s;
  }
}
</style>