<template>
  <li class="profile"
    :class="{fixed: activeFixed}"
    @click="toProfile"
  >
    <div class="user__bonus">
      <div class="bonus__number">0</div>
      <div class="bonus__name">бонусы</div>
    </div>
    <div class="user__avatar">
      <img class="avatar__img" v-if="user.img" :src="user.img" alt="avatar">
      <img class="avatar__img" v-else src="../../assets/avatar.svg" alt="avatar">
    </div>
    <div class="profile__dropdown" @click.stop="logoutHandler">
      <svg class="exit__icon">
        <use xlink:href="#exit"></use>
      </svg>
      <button class="profile__btn">Выйти</button>
    </div>
  </li>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'HeaderProfile',
  props:{
    user:{
      type: Object,
      default: () => ({})
    },
    activeFixed:{
      type: Boolean,
      default: false
    }
  },
  methods:{
    ...mapActions({
      logout: 'user/logout'
    }),
    toProfile(){
      if(this.$route.path === '/profile') return
      this.$router.push('/profile')
    },
    logoutHandler(){
      this.logout()
      if(this.$route.meta.auth){
        this.$router.push('/')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.profile{
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px 16px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  margin: 0 14px;
  background-color: #fff;
  cursor: pointer;
  transition: .3s;
  &:hover{
    box-shadow: 0 2px 12px 0 rgba(41, 44, 51, 0.3);
    transition: .3s;
  }
  &:hover .profile__dropdown{
    opacity: 1;
    z-index: 700;
    transition: .3s;
  }
  &.fixed{
    padding: 0 16px;
  }
  &.fixed .profile__dropdown{
    bottom: -144%;
  }
}

.user__bonus{
  text-align: right;
}

.bonus__number{
  font-size: 14px;
  font-weight: 600;
  line-height: 1.1;
  margin-bottom: 7px;
}

.bonus__name{
  font-size: 12px;
  color: #bfb7b6;
}

.user__avatar{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 52px;
  height: 52px;
  margin-left: 7px;
  &::before{
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url('../../assets/avatar-background.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
}

.avatar__img{
  position: relative;
  z-index: 2;
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.profile__dropdown{
  position: absolute;
  bottom: -100%;
  left: 0;
  z-index: 700;
  transform: translateY(-50%);
  opacity: 0;
  z-index: -200;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 10px 16px;
  background-color: #fff;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  box-shadow: 0 12px 12px 0 rgba(41, 44, 51, 0.3);
  transition: .3s;
  &::before{
    content: '';
    width: 70%;
    height: 1px;
    position: absolute;
    top: 5px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #bfb7b6;
    transition: .3s;
  }
  &:hover .profile__btn{
    color: #009471;
    transition: .3s;
  }
  &:hover .exit__icon{
    fill: #009471;
    transition: .3s;
  }
}

.profile__btn{
  color: #bfb7b6;
  font-size: 12px;
  margin-left: 5px;
  transition: .3s;
}

.exit__icon{
  width: 24px;
  height: 24px;
  fill: #bfb7b6;
  transition: .3s;
}
</style>