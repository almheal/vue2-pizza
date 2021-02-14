<template>
  <div class="basket">
    <div class="basket__inner" :class="{hide: !showItems}">
      <div class="basket__header">
        <div class="circle"></div>
        <div class="wrapper__icon">
          <img class="icon__basket" src="../../assets/shopping-cart.svg" alt="basket">
        </div>
      </div>
      <div class="basket__body">
        <div class="wrapper__title">
          <basket-title
            :title="basketTitle"
            :showItems="showItems"
            :count="getCountItems"
            @hideItems="hideItemsHandler"
          >
            <app-triangle-icon :anim="showItems"/>
          </basket-title>
          <div class="clear__basket"
            v-if="getCountItems"
            @click="clearBasket"
          >Очистить</div>
        </div>
        <template v-if="showItems">
          <template v-if="getBasket.length">
          <div class="basket__items">
            <basket-item
              v-for="(product,index) in getBasket" :key="index"
              :product="product"
              @removeProduct="removeProductHandler"
            />
            </div>
            <div class="basket__total">
              <div class="total__name">Сумма заказа:</div>
              <div class="total__price">
              {{getTotal}} <span>₽</span>
              </div>
            </div>
            <div class="wrapper__btn">
              <app-button :name="btnName" @buttonOnClick="toOrderPage"/>
            </div>
          </template>
          <basket-empty v-else/>
        </template>
      </div>
    </div>
    <app-promo-code />
  </div>
</template>

<script>
import BasketTitle from '@/components/basket/BasketTitle'
import AppTriangleIcon from '@/components/AppTriangleIcon'
import BasketItem from '@/components/basket/BasketItem'
import BasketEmpty from '@/components/basket/BasketEmpty'
import AppButton from '@/components/AppButton'
import AppPromoCode from '@/components/AppPromoCode'
import { mapActions, mapGetters } from 'vuex'


export default {
  name: 'AppBasket',
  components:{
    BasketTitle,
    AppTriangleIcon,
    BasketItem,
    BasketEmpty,
    AppButton,
    AppPromoCode
  },
  data:()=>({
    showItems: true,
    btnName: 'ОФОРМИТЬ',
    basketTitle: 'Корзина'
  }),
  computed:{
    ...mapGetters({
      getBasket: 'basket/getBasket',
      getCountItems: 'basket/getCountItems',
      getTotal: 'basket/getTotal'
    })
  },
  methods:{
    ...mapActions({
      getProductsFromLocal: 'basket/getProductsFromLocal',
      removeFromBasket: 'basket/removeFromBasket',
      clearBasket: 'basket/clearBasket'
    }),
    hideItemsHandler(){
      this.showItems = !this.showItems
    },
    removeProductHandler(product){
      this.removeFromBasket(product)
    },
    toOrderPage(){
      this.$router.push('/order')
    }
  },
  mounted(){
    this.getProductsFromLocal()
  }
}
</script>

<style lang="scss" scoped>
.basket{
  position: sticky;
  right: 0;
  top: 25px;
  width: 25%;
  margin-left: 25px;
  padding-top: 40px;
}

.basket__inner{
  background-color: #fff;
  margin-bottom: 8px;
  padding-bottom: 24px;
  &.hide{
    padding-bottom: 0;
  }
}

.wrapper__title{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.clear__basket{
  color: #009471;
  font-size: 12px;
  cursor: pointer;
  transition: .3s;
  &:hover{
    color: #4A9382;
    transition: .3s;
  }
}

.basket__body{
  position: relative;
  padding: 24px;
  z-index: 5;
  background-color: #fff;
}

.basket__header{
  display: flex;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 40px;
  &::after{
    content: '';
    width: 100%;
    height: 3px;
    background-color: #c21313;
    position: absolute;
    left: 0;
    bottom: 0;
  }
}

.circle{
  display: flex;
  position: relative;
  z-index: 5;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid #c21313;
  background-color: #fff;
}

.wrapper__icon{
  position: absolute;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  z-index: 15;
}

.icon__basket{
  width: 24px;
  height: 24px;
}


.basket__items{
  max-height: 50vh;
  overflow-y: auto;
  padding-right: 6px;
  transition: .3s;
  &.hideItems{
    height: 0px;
    overflow: hidden;
    transition: .3s;
  }
}

::-webkit-scrollbar {
    width: 2px;
    background-color: #009471;
}

.basket__total{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0 10px;
  margin-bottom: 20px;
}

.total__name{
  font-family: 'Gotham';
  font-weight: 700;
}

.total__price{
  font-size: 18px;
  font-weight: 600;
  & span{
    font-weight: 400;
  }
}

.wrapper__btn{
  display: flex;
  justify-content: center;
}
</style>