<template>
  <nav class="nav">
    <ul class="nav__list">
      <li class="nav__item">Меню</li>
      <li class="nav__item" v-for="(item,index) in nav" :key="index">
        <router-link class="nav__link" to="/">{{item}}</router-link>
      </li>
      <li class="nav__login">
        <app-button
          :color="'green'"
          :backgroundColor="'light-green'"
          :name="button"
          :disable="poppup ? true : false"
          @buttonOnClick="callPoppup('Вход')"
        />
      </li>
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

export default {
  name: 'AppNav',
  components:{
    AppButton,
    AppLogin,
    AppRegister,
    AppPasswordForm
  },
  props:{
    nav: {
      type: Array,
      default: ()=> []
    }
  },
  data: () => ({
    button: 'вход',
    poppup: ''
  }),
  methods:{
    callPoppup(title){
      this.poppup = title
    }
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

.nav__login{
  position: relative;
  z-index: 2;
  border-radius: 24px;
  margin: 0 16px;
  &:hover::before{
    transform: scale(1.1);
    transition: .3s;
  }
  &::before{
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    border-radius: 24px;
    background-color: #e1faf4;
    transition: .3s;
  }
}
</style>