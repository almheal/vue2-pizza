<template>
  <header class="header"
  >
    <div class="container">
      <div class="header__inner">
        <app-logo />
        <div class="nav__wrapper">
          <app-nav
            :nav="nav"
            v-if="menu"
          />
          <div class="actions__wrapper">
            <language />
            <burger-menu @openMenu="toggleMenuHandler" :active="menu"/>
          </div>
        </div>
        <div class="access__register" v-if="getUserMessage === 'Регистрация прошла успешно'">{{getUserMessage}}</div>
      </div>
    </div>
    <div class="clone__header" :class="{fixed: fixed}">
      <div class="container">
        <div class="header__inner">
          <app-logo :activeFixed="fixed"/>
          <ul class="categories__list" v-if="getCategories.length && !menu">
              <li class="categories__item" v-for="(category, index) in getCategories" :key="index">{{category.title}}</li>
          </ul>
          <div class="nav__wrapper">
            <app-nav
              :nav="nav"
              v-if="menu"
              :activeFixed="fixed"
            />
            <div class="actions__wrapper">
              <language :activeFixed="fixed"/>
              <burger-menu @openMenu="toggleMenuHandler" :active="menu" :activeFixed="fixed"/>
            </div>
          </div>
          <div class="access__register" v-if="getUserMessage === 'Регистрация прошла успешно'">{{getUserMessage}}</div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import AppLogo from '@/components/header/AppLogo'
import Language from '@/components/header/Language'
import BurgerMenu from '@/components/header/BurgerMenu'
import AppNav from '@/components/header/AppNav'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'TheHeader',
  components:{
    AppLogo,
    AppNav,
    Language,
    BurgerMenu,
  },
  data:()=>({
    menu: false,
    nav: ['Акции','Папа Бонус','Контакты'],
    fixed: false,
  }),
  computed:{
    ...mapGetters({
      getCategories: 'category/getCategories',
      getUserMessage: 'user/getUserMessage'
    })
  },
  methods:{
    ...mapActions({
      changeLanguage: 'changeLanguage'
    }),
    toggleMenuHandler(){
      this.menu = !this.menu
    }
  },
  mounted(){
    let languageLocal =  JSON.parse(localStorage.getItem('language'))
    if(!languageLocal){
      languageLocal = 'Ru'
      this.changeLanguage(languageLocal)
    }else{
      this.changeLanguage(languageLocal)
    }
    window.addEventListener('scroll', () => {
      const savedWindow = window
      const pageY = savedWindow.pageYOffset
      if(pageY > 600){
        this.fixed = true
      }else{
        this.fixed = false
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.header{
  height: 80px;
  background-color: #fff;
  transition: .3s;
}

.clone__header{
  height: 60px;
  position: fixed;
  left: 0;
  top: -100%;
  right: 0;
  background-color: #fff;
  opacity: 0;
  box-shadow: 0 2px 24px 0 rgba(83,92,90, 0.2);
  transition: .7s;
  &.fixed{
    opacity: 1;
    top: 0;
    z-index: 500;
    transition: .7s;
    &.header__inner{
      padding: 0;
    }
  }
}

.header__inner{
  position: relative;
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
}

.categories__list{
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.categories__item{
  position: relative;
  font-family: 'Gotham';
  padding: 15px 10px;
  text-transform: uppercase;
  cursor: pointer;
  &::after{
    content: '';
    position: absolute;
    left: 50%;
    bottom: -8px;
    transform: translateX(-50%);
    width: calc(100% - 20px);
    height: 3px;
    background-color: #c21313;
    border-radius: 2px;
    opacity: 0;
    transition: .3s;
  }
  &:hover::after{
    opacity: 1;
    transition: .3s;
  }
}

.nav__wrapper{
  display: flex;
  align-items: center
}

.actions__wrapper{
  display: flex;
  align-items: center;
}

.access__register{
  position: absolute;
  text-align: center;
  line-height: 1.3;
  color: #009471;
  background-color: #e1faf4;
  width: 300px;
  background-color: #fff;
  position: absolute;
  right: 0;
  z-index: 700;
  top: 100%;
  padding: 30px 25px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 18px;
  box-shadow: 0 2px 12px 0 rgba(41, 44, 51, 0.2);
}
</style>