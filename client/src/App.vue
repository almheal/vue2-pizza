<template>
  <div id="main">
    <app-svg-sprites />
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import Default from '@/layouts/Default'
import AppSvgSprites from './components/AppSvgSprites.vue'

export default {
  name: 'App',
  components: {
    Default,
    AppSvgSprites
  },
  computed:{
    layout(){
      return this.$route.meta.layout
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/index.scss';

</style>
