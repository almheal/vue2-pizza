<template>
  <div class="section">
    <div class="section__top" v-if="!showItems">
      <basket-title
        :title="title"
        :showItems="showItems"
        @hideItems="hideItemsHandler"
      >
        <triangle-icon :anim="showItems"/>
      </basket-title>
      <template v-if="!showItems && products.length">
          <div class="list__images">
          <div class="img__item" v-for="(product, index) in products" :key="index">
            <img class="product__img" :src="product.img" alt="product">
          </div>
        </div>
        <div class="total__order" >
          <span>Итого:</span>
          <product-price :price="total"/>
        </div>
      </template>
      </div>
      <basket-title
        v-if="showItems"
        :title="title"
        :showItems="showItems"
        @hideItems="hideItemsHandler"
      >
        <triangle-icon :anim="showItems"/>
      </basket-title>
      <template v-if="products.length && showItems">
        <div class="list__items">
          <basket-item
            class="flex"
            v-for="(product,index) in products" :key="index"
            :product="product"
            @removeProduct="removeProductHandler"
          />
        </div>
        <div class="total__order">
          <span>Итого:</span>
          <product-price :price="total"/>
        </div>
      </template>
    <basket-empty v-if="!products.length"/>
  </div>
</template>

<script>
import BasketTitle from '@/components/basket/BasketTitle'
import TriangleIcon from '@/components/icons/TriangleIcon'
import BasketItem from '@/components/basket/BasketItem'
import BasketEmpty from '@/components/basket/BasketEmpty'
import ProductPrice from '@/components/product/ProductPrice'
import { mapActions } from 'vuex'

export default {
  name: 'OrderBasket',
  components:{
    BasketTitle,
    TriangleIcon,
    BasketItem,
    BasketEmpty,
    ProductPrice
  },
  props:{
    products:{
      type: Array,
      default: () => []
    },
    total: {
      type: [String,Number],
      default: 0
    }
  },
  data: () => ({
    title: 'Корзина',
    showItems: true
  }),
  methods:{
    ...mapActions({
      removeFromBasket: 'basket/removeFromBasket'
    }),
    removeProductHandler(product){
      this.removeFromBasket(product)
    },
    hideItemsHandler(){
      this.showItems = !this.showItems
    },
  }
}
</script>

<style lang="scss" scoped>
.section__top{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section{
  padding: 32px 64px 24px;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 6px;
}

.list__items{
  padding-top: 30px;
}

.list__images{
  display: flex;
  align-items: center;
}

.img__item{
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.product__img{
  width: 100%;
}

.total__order{
  display: flex;
  align-items: center;
  padding: 15px 0;
  justify-content: flex-end;
  & span{
    display: inline-block;
    margin-right: 5px;
  }
}
</style>