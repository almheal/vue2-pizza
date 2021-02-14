<template>
  <nav class="nav">
    <ul class="nav__list">
      <li class="nav__item">Меню</li>
      <li class="nav__item" v-for="(item,index) in nav" :key="index">
        <router-link class="nav__link" to="/">{{item}}</router-link>
      </li>
      <li class="nav__login">
        <button class="login__btn">
          вход
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
  props:{
    nav: {
      type: Array,
      default: ()=> []
    }
  }
}
</script>

<style lang="scss" scoped>
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

.login__btn{
  display: inline-block;
  padding: 15px 25px;
  color: #009471;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  transition: .3s;
}
</style>