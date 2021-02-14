<template>
  <div class="ingredients">
    <div class="ingredients__body">
      <div class="ingredients__title">Убрать ингредиенты</div>
      <div class="ingredients__content">
        <ul class="ingredients__list">
          <template v-for="(ingredient,index) in product.ingredients">
            <product-ingredients-item
              v-if="ingredient.title"
              :key="index"
              :ingredient="ingredient"
              @removeIngredient="removeIngredientHandler"
            />
          </template>
        </ul>
        <button class="add__ingredients" @click.prevent="toConstructor">
          <span class="btn__icon"></span>
            Добавить ингредиенты
        </button>
      </div>
      <div class="ingredients__actions">
        <button class="cancel__btn" @click.prevent="cancelIngredients">Отмена</button>
        <app-button
          :name="btnName"
          @buttonOnClick="addProduct"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProductIngredientsItem from '@/components/product/productIngredients/ProductIngredientsItem'
import AppButton from '@/components/AppButton'

export default {
  name: 'ProductIngredients',
  components:{
    ProductIngredientsItem,
    AppButton
  },
  props:{
    product:{
      type: Object,
      default: () => {}
    },
  },
  data: () =>({
    btnName: 'в корзину'
  }),
  methods:{
    cancelIngredients(){
      this.$emit('cancelIngredients')
    },
    removeIngredientHandler(ingredient){
      this.$emit('removeIngredientHandler', ingredient)
    },
    toConstructor(){
      this.$emit('toConstructorPage')
    },
    addProduct(){
      this.$emit('addProduct')
    }
  }
}
</script>

<style lang="scss" scoped>
.ingredients{
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 22;
  border-radius: 6px;
  padding: 15px;
  background-color: rgba(0,0,0,0.3);
}

.ingredients__body{
  background-color: #fff;
  border-radius: 6px;
  padding: 24px 24px 16px;
}

.ingredients__title{
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
}

.ingredients__content{
  padding-bottom: 10px;
  border-bottom: 1px solid #E6E2E1;
  margin-bottom: 16px;
}

.ingredients__actions{
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.add__ingredients{
  display: flex;
  align-items: center;
  color: #009471;
  font-weight: 600;
  font-size: 14px;
  padding: 10px 0;
  transition: .3s;
  &:hover .btn__icon{
    background-color: #006D54;
    transition: .3s;
  }
  &:hover{
    color: #006D54;
    transition: .3s;
  }
}

.btn__icon{
  position: relative;
  display: block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #009471;
  margin-right: 10px;
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
    transform: translate(-50%,-50%) rotate(90deg);
  }
}



.cancel__btn{
  color: #bfb7b6;
  padding: 6px 6px 6px 0;
  transition: .3s;
  &:hover{
    color: #009471;
    transition: .3s;
  }
}
</style>