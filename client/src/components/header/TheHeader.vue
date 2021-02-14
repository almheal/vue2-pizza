<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <Logo />
        <div class="nav__wrapper">
          <Nav :nav="nav" v-if="menu"/>
          <div class="actions__wrapper">
            <Language />
            <BurgerMenu @openMenu="openMenuHandler" :active="menu"/>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import Logo from '@/components/header/Logo'
import Language from '@/components/header/Language'
import BurgerMenu from '@/components/header/BurgerMenu'
import Nav from '@/components/header/Nav'

export default {
  name: 'TheHeader',
  components:{
    Logo,
    Nav,
    Language,
    BurgerMenu
  },
  data:()=>({
    menu: false,
    nav: ['Акции','Папа Бонус','Контакты']
  }),
  methods:{
    openMenuHandler(){
      this.menu = !this.menu
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
  background-color: #fff;
}

.header__inner{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
}

.nav__wrapper{
  display: flex;
  align-items: center
}

.actions__wrapper{
  display: flex;
}
</style>