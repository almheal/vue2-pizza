<template>
  <div class="product__variety">
    <div class="variety__name">{{ingredient.title}}</div>
    <div class="wrapper__price">
      <constructor-item-counter
        :count="ingredient.count"
        @changeCounter="changeCounterHandler"
      />
      <div class="variety__price">{{ingredient.price * ingredient.count}} <span>₽</span></div>
      <div class="wrapper__btn">
        <btn-cross @btnOnClick="removeIngredientHandler"/>
      </div>
    </div>
  </div>
</template>

<script>
import ConstructorItemCounter from '@/components/constructor/ConstructorItemCounter'
import BtnCross from '@/components/buttons/BtnCross'
import { mapActions } from 'vuex'

export default {
  name: 'ContentListItem',
  components:{
    BtnCross,
    ConstructorItemCounter
  },
  props:{
    ingredient:{
      type: Object,
      default: () => {}
    }
  },
  methods:{
    ...mapActions({
      changeCountIngredient: 'productConstructor/changeCountIngredient',
      removeIngredient: 'productConstructor/removeIngredient',
      calculateTotal: 'productConstructor/calculateTotal',
      calculateIngredientsLength: 'productConstructor/calculateIngredientsLength',
    }),
    async changeCounterHandler(num){
      await this.changeCountIngredient({ingredient: this.ingredient, num})
      this.calculateTotal()
      this.calculateIngredientsLength()
    },
    removeIngredientHandler(){
      this.removeIngredient(this.ingredient)
    }
  }
}
</script>

<style lang="scss" scoped>
.product__variety{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

.variety__name{
  font-size: 12px;
  margin-right: 8px;
}

.wrapper__price{
  display: flex;
  width: 38%;
  justify-content: flex-end;
  align-items: center;
}

.variety__price{
  width: 50%;
  text-align: right;
  font-weight: 600;
  & span{
    font-weight: 400;
  }
}

.wrapper__btn{
  position: relative;
  cursor: pointer;
  margin-left: 5px;
  &:hover .remove__btn::before,
  &:hover .remove__btn::after{
    background-color: #c21313;
    transition: .3s;
  }
}
</style>