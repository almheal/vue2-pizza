<template>
  <div class="profile">
    <div class="container">
      <div class="profile__inner">
        <ProfileSidebar
          v-if="getUser"
          :user="getUser"
        />
        <div class="profile__body">
          <div class="profile__section">
            <div class="section__header">
              <h5 class="section__title">Мои бонусы: 0</h5>
            </div>
          </div>
          <div class="profile__section">
            <div class="section__header">
              <h5 class="section__title">История заказов</h5>
              <h6 class="section__text">Редактировать заказ можно в корзине</h6>
            </div>
            <div class="section__body">
              <div class="empty__history">
                История пуста
              </div>
            </div>
          </div>
          <div class="profile__section">
            <div class="section__header">
              <h5 class="section__title">Адреса доставки</h5>
            </div>
            <div class="section__body">
              <div class="address__item">
                <div class="plus__icon"></div>
                <div class="address__item-title">Добавить адрес</div>
              </div>
            </div>
          </div>
          <div class="profile__section">
            <div class="section__header">
              <h5 class="section__title">Карты и оплата</h5>
              <h6 class="section__subtitle">Оплата подтверждается SMS-кодом</h6>
            </div>
            <div class="section__body">
              <div class="payment__add">
                <div class="plus__icon"></div>
                <div class="payment__name">Добавить карту</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileSidebar from '@/components/profile/ProfileSidebar'
import { mapGetters } from 'vuex'

export default {
  name: 'Profile',
  components:{
    ProfileSidebar
  },
  computed:{
    ...mapGetters({
      getUser: 'user/getUser'
    })
  }
}
</script>


<style lang="scss" scoped>
.profile{
  background-color: #f8f8f8;
  min-height: 100vh;
}

.profile__inner{
  display: flex;
  align-items: flex-start;
  padding: 135px 0 50px;
}

.profile__body{
  width: 75%;
  margin-left: 40px;
}

.profile__section{
  width: 100%;
  padding: 32px 64px 30px;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 6px;
}

.section__header{
  position: relative;
  &::after{
    content: '';
    width: 100%;
    height: 1px;
    position: absolute;
    left: 0;
    bottom: -12px;
    background-color:  #e6e2e1;
  }
}

.section__title{
  margin-bottom: 14px;
  font-family: 'Gotham';
  font-weight: 700;
  font-size: 18px;
}

.section__text{
  font-size: 12px;
  color: #bfb7b6;
}

.section__body{
  margin-top: 42px;
}

.address__item{
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover .address__item-title{
    color: #009471;
    transition: .3s;
  }

  &:hover .plus__icon{
    background-color: #009471;
    transition: .3s;
  }
}

.address__item-title{
  font-size: 14px;
  font-weight: 500;
  transition: .3s;
}

.plus__icon{
  position: relative;
  margin-right: 8px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #bfb7b6;
  transition: .3s;
  &::before,
  &::after{
    content: '';
    width: 8px;
    height: 2px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  &::after{
    transform: translate(-50%,-50%) rotate(-90deg);
  }
}

.empty__history{
  font-family: 'Gotham';
  font-weight: 600;
  font-size: 16px;
  text-align: center;
}

.payment__add{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 17px 8px 15px;
  background-color: #f5f5f5;
  border-radius: 3px;
  width: 118px;
  font-size: 12px;
  transition: .3s;
  cursor: pointer;
  &:hover{
    background-color: #e1faf4;
    transition: .3s;
  }
  &:hover .plus__icon{
    background-color: #009471;
    transition: .3s;
  }
}

.payment__name{
  margin-top: 7px;
}
</style>