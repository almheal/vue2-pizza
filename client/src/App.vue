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
import { mapActions } from 'vuex'

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
  },
  methods:{
    ...mapActions({
      auth: 'user/auth'
    })
  },
  async mounted(){
    const response = await this.auth()
    if(response && response.status === 403 && this.$route.path === '/profile'){
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/index.scss';

</style>
