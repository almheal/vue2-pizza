<template>
  <nav class="nav">
    <ul class="nav__list">
      <li class="nav__item">Меню</li>
      <li class="nav__item" v-for="(item,index) in nav" :key="index">
        <router-link class="nav__link" to="/">{{item}}</router-link>
      </li>
      <li class="nav__item nav__button" v-if="!getUser">
        <app-button
          :color="'green'"
          :backgroundColor="'light-green'"
          :name="button"
          :disable="poppup ? true : false"
          @buttonOnClick="callPoppup('Вход')"
        />
      </li>
      <header-profile
        v-if="getUser"
        :user="getUser"
        :activeFixed="activeFixed"
      />
    </ul>
    <app-login
      v-if="poppup === 'Вход'"
      @closeLoginModal="callPoppup('')"
      @toRegister="callPoppup('Регистрация')"
    />
    <app-register
      v-if="poppup === 'Регистрация'"
      @closeRegisterModal="callPoppup('')"
      @toLogin="callPoppup('Вход')"
      @toPassword="callPoppup('Пароль')"
    />
    <app-password-form
      v-if="poppup === 'Пароль'"
      @closePasswordModal="callPoppup('')"
      @toRegisterForm="callPoppup('Регистрация')"
    />

  </nav>
</template>

<script>
import AppButton from '@/components/AppButton'
import AppLogin from '@/components/login/AppLogin'
import AppRegister from '@/components/login/AppRegister'
import AppPasswordForm from '@/components/login/AppPasswordForm'
import HeaderProfile from '@/components/header/HeaderProfile'
import { mapGetters } from 'vuex'

export default {
  name: 'AppNav',
  components:{
    AppButton,
    AppLogin,
    AppRegister,
    AppPasswordForm,
    HeaderProfile
  },
  props:{
    nav: {
      type: Array,
      default: ()=> []
    },
    activeFixed:{
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    button: 'вход',
    poppup: ''
  }),
  computed:{
    ...mapGetters({
      getUser: 'user/getUser'
    })
  },
  methods:{
    callPoppup(title){
      this.poppup = title
      if(!title){
        this.$emit('closeLoginPoppup')
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.nav{
  position: relative;
}

.nav__list{
  display: flex;
  align-items: center;
}

.nav__item{
  font-weight: 600;
  color: #bfb7b6;
  font-size: 16px;
  &:first-child{
    padding: 0 14px;
  }
}

.nav__link{
  display: inline-block;
  padding: 0 14px;
  color: #70544f;
  font-weight: 600;
  transition: .3s;
  &:hover{
    color: #009471;
    transition: .3s;
  }
}

.nav__button{
  margin: 0 14px;
}
</style>