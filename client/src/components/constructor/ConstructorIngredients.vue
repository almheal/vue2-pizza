<template>
  <div class="ingredients">
    <div class="ingredients__list">
      <template v-for="(ingredient, index) in ingredients">
        <div class="ingredient__column"
          v-show="ingredient.category === activeCategory._id"
          :key="index"
          :class="{active: ingredient.count}"
          @click="addIngredient(ingredient)"
        >
          <div class="ingredients__body">
            <constructor-ingredient-item :ingredient="ingredient"/>
          </div>
          <div class="wrapper__btn" :class="{removed: ingredient.count === 2}">
            <button class="ingredient__add"></button>
          </div>
          <div class="counter" v-if="ingredient.count"><span>x</span>{{ingredient.count}}</div>
          <div class="trash-basket"
            v-if="ingredient.count"
            @click.stop="removeIngredient(ingredient)"
          >
            <img class="basket__icon" src="../../assets/trash-basket.svg" alt="trash-basket">
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import ConstructorIngredientItem from '@/components/constructor/ConstructorIngredientItem'
import { mapActions } from 'vuex'


export default {
  name: 'ConstructorIngredients',
  components:{
    ConstructorIngredientItem
  },
  props:{
    activeCategory:{
      type: Object,
      default: () => {}
    },
    ingredients:{
      type: Array,
      default: () => []
    }
  },
  methods:{
    ...mapActions({
      removeIngredient: 'productConstructor/removeIngredient',
      addIngredientInProduct: 'productConstructor/addIngredientInProduct',
      calculateTotal: 'productConstructor/calculateTotal',
      calculateIngredientsLength: 'productConstructor/calculateIngredientsLength'
    }),
    async addIngredient(ingredient){
      await this.addIngredientInProduct(ingredient)
      this.calculateTotal()
      this.calculateIngredientsLength()
    }
  }
}
</script>

<style lang="scss" scoped>
.ingredients__list{
  display: flex;
  flex-wrap: wrap;
}

.ingredient__column{
  position: relative;
  width: calc(25% - 10px);
  margin: 5px;
  background-color: rgba(0,0,0,0.027);
  border-radius: 6px;
  text-align: center;
  padding: 12px;
  cursor: pointer;
  &:hover .wrapper__btn{
    opacity: 1;
    transition: .3s;
  }
  &.active{
    background-color: #FFD8A6;
  }
  &.active:hover .trash-basket{
    opacity: 1;
    transition: .3s;
  }
}

.counter{
  position: absolute;
  right: 5px;
  top: 5px;
  font-size: 12px;
  font-weight: 600;
}

.trash-basket{
  position: absolute;
  left: 0;
  bottom: 0;
  width: 36px;
  padding: 10px;
  opacity: 0;
  height: 36px;
  z-index: 20;
  transition: .3s;
}

.basket__icon{
  width: 16px;
  height: 16px;
}

.wrapper__btn{
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.04);
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  border-radius: 6px;
  transition: .3s;
  &.removed .ingredient__add{
    background-color: #C21313;
    transition: .3s;
  }
  &.removed .ingredient__add::after{
    opacity: 0;
    transition: .3s;
  }
}

.ingredient__add{
  position: absolute;
  left: 50%;
  top: 20px;
  width: 46px;
  height: 46px;
  background-color: #009471;
  border-radius: 50%;
  transform: translateX(-50%);
  transition: .3s;
  &::before,
  &::after{
    content: '';
    width: 16px;
    height: 4px;
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

.ingredients__body{
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
}
</style>