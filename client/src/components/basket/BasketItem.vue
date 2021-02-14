<template>
  <div class="basket__item">
    <div class="item__body">
      <div class="wrapper__btn">
        <btn-cross @btnOnClick="removeProduct"/>
      </div>
      <div class="wrapper__img">
        <img class="item__img" :src="product.img"  alt="product">
      </div>
      <div class="item__content">
        <div class="item__title">{{product.title}}</div>
        <div class="item__description" v-if="product.variety && product.kind">{{`${product.variety.title} тесто, ${product.kind.size} см`}}</div>
        <div class="item__description" v-if="product.variety && !product.kind">{{product.variety.title}}</div>
        <template v-for="(ingredient, index) in product.ingredients">
          <div class="new__ingredient" v-if="ingredient.count > 1" :key="index">x{{ingredient.count}} {{ingredient.title}}</div>
          <div class="new__ingredient" v-if="ingredient.count < 2 && !ingredient.owner" :key="ingredient.title">{{ingredient.title}}</div>
        </template>
        <template v-if="product.removedIngredients">
          <div class="removed__ingredient"
            v-for="(ingredient, index) in product.removedIngredients" :key="index"
          >- {{ingredient.title}}</div>
        </template>
      </div>
    </div>
    <div class="basket__bottom">
      <basket-counter
        :count="product.count"
        @decrementProduct="decrementHandler"
        @incrementProduct="incrementHandler"
      />
      <div class="item__price">{{product.price * product.count}} <span>₽</span></div>
    </div>
  </div>
</template>

<script>
import BtnCross from '@/components/buttons/BtnCross'
import BasketCounter from '@/components/basket/BasketCounter'
import { mapActions } from 'vuex'

export default {
  name: 'BasketItem',
  components:{
    BtnCross,
    BasketCounter
  },
  props: {
    product:{
      type: Object,
      default: () => {}
    }
  },
  methods:{
    ...mapActions({
      changeCounterProduct: 'basket/changeCounterProduct'
    }),
    removeProduct(){
      this.$emit('removeProduct', this.product)
    },
    decrementHandler(){
      this.changeCounterProduct({product: this.product, operation: '-'})
    },
    incrementHandler(){
      this.changeCounterProduct({product: this.product, operation: '+'})
    }
  },
}
</script>

<style lang="scss" scoped>
.basket__item{
  position: relative;
  padding: 16px 0;
  border-bottom: 1px solid #ededed;
  &.flex{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 40px 15px 60px;

    & .wrapper__btn{
      top: 50%;
      transform: translateY(-50%);
    }

    & .item__body{
    align-items: center;
    margin-bottom: 0;
    }

    & .wrapper__img{
      width: 125px;
      height: 70px;
      margin-right: 20px;
    }

    & .item__price{
      margin-left: 30px;
    }

    & .item__img{
      height: 100%;
      object-fit: cover;
    }
  }
}

.item__body{
  display: flex;
  margin-bottom: 12px;
}

.wrapper__btn{
  position: absolute;
  right: 0;
  top: 16px;
}

.wrapper__img{
  width: 20%;
  margin-right: 5px;
}

.item__img{
  width: 100%;
}

.remove__btn{
  &:hover::before,
  &:hover::after{
    background-color: #C21313;
    transition: .3s;
  }
}

.basket__bottom{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item__price{
  font-weight: 600;
  & span{
    font-weight: 400;
  }
}

.item__content{
  width: 80%;
}

.item__title{
  font-size: 12px;
  font-family: 'Gotham';
  font-weight: 700;
  margin-bottom: 5px;
  padding-right: 50px;
  line-height: 1.3;
}

.item__description{
  color: #a69895;
  font-size: 12px;
  margin-bottom: 5px;
}

.removed__ingredient{
  color: #c21313;
  line-height: 1.1;
  font-size: 12px;
  margin-top: 5px;
}

.new__ingredient{
  color: #009471;
  font-size: 12px;
  margin-bottom: 3px;
}
</style>