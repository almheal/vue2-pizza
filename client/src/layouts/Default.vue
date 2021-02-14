<template>
  <div class="layout">
    <TheHeader />
    <div class="layout__body">
      <router-view />
    </div>
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from '@/components/header/TheHeader'
import TheFooter from '@/components/footer/TheFooter'

export default {
  name: 'Default',
  components:{
    TheHeader,
    TheFooter
  }
}
</script>

<style lang="scss" scoped>

</style>