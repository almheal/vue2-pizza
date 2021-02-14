<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__inner">
        <div class="footer__navigation">
          <footer-list
            class="footer__column"
            v-for="(item, index) in navigation" :key="index" :list="item"
          />
        </div>
        <div class="footer__text">&copy; Copyright 2004 - 2021 ООО «4ПАПАС».</div>
        <div class="footer__text">Все права защищены.</div>
        <div class="footer__text">Возраст 6+</div>
        <router-link class="footer__text footer__personal-data" to="/">Политика обработки персональных данных</router-link>
      </div>
    </div>
  </footer>
</template>

<script>
import FooterList from '@/components/footer/FooterList'
import navigationList from './navigation.list'

export default {
  name: 'TheFooter',
  components:{
    FooterList
  },
  data: () => ({
    navigation: []
  }),
  mounted(){
    this.navigation = navigationList
  }
}
</script>

<style lang="scss" scoped>
.footer__inner{
  padding: 30px 0;
}

.footer__column{
  width: 20%;
  margin-right: 30px;
}

.footer__navigation{
  display: flex;
  margin-bottom: 30px;
}

.footer__text{
  font-size: 12px;
  color: #a69895;
  margin-bottom: 5px;
}

.footer__personal-data{
  display: block;
  text-align: center;
  margin-top: 20px;
  transition: .3s;
  &:hover{
    color: #009471;
    transition: .3s;
  }
}
</style>