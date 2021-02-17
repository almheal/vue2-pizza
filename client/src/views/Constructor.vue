<template>
  <div class="constructor">
    <div class="container" v-if="!loader">
      <div class="constructor__body" v-if="!added">
        <div class="ingredients__column">
          <app-page-title
            :title="title"
            :subtitle="subtitle"
          />
          <constructor-categories
            :categories="getIngredientCategories"
            :activeCategory="activeCategory"
            @changeCategory="changeCategoryHandler"
          />
          <div class="constructor__row">
            <constructor-ingredients
              :ingredients="getIngredients"
              :activeCategory="activeCategory"
            />
          </div>
          <div class="danger__message" v-if="getIngredientsLength === 10">Пицца уже содержит 10 ингредиентов. Может быть, хотите что-то убрать?</div>
        </div>
        <div class="product__column">
          <div class="product__img-wrapper">
            <img class="product__img" :src="getConstructorProduct.img" alt="product">
          </div>
          <div class="product__info">
            <input class="product__title"
              v-model="newTitle"
              :placeholder="'Придумайте название'"
            />
            <img class="edit-icon" src="../assets/pen.svg" alt="edit">
            <product-variety
              :variety="defaultProduct.variety"
              :activeProduct="getConstructorProduct ? getConstructorProduct : {}"
              @changeVariety="changeVarietyHandler"
            />
            <product-kind
              :kinds="getConstructorProduct.variety ? getConstructorProduct.variety.kind : []"
              :activeProduct="getConstructorProduct"
              @changeKind="changeKindHandler"
            />
          </div>
          <div class="product__content">
            <div class="content__title">Ваша пицца содержит:</div>
            <constructor-content-list
              :title="getConstructorProduct.variety ? getConstructorProduct.variety.title : ''"
              :price="getConstructorProduct.price"
              :kind="getConstructorProduct.kind ? getConstructorProduct.kind.size : ''"
              :ingredients="getConstructorProduct.ingredients"
            />
          </div>
          <div class="product__actions">
            <app-button :name="btnName" @buttonOnClick="addProduct"/>
            <div class="product__total">
              <div class="total__name">Итого:</div>
              <div class="total__number">{{getTotal}} <span>₽</span></div>
            </div>
          </div>
        </div>
      </div>
       <app-notification :title="`Пицца «${getConstructorProduct.title}» добавлена в корзину`" v-else/>
    </div>
    <div class="wrapper__loader" v-else>
      <app-scale-loader :loader="loader"/>
    </div>
  </div>
</template>

<script>
import ConstructorCategories from '@/components/constructor/ConstructorCategories'
import ConstructorIngredients from '@/components/constructor/ConstructorIngredients'
import ProductVariety from '@/components/product/ProductVariety'
import ProductKind from '@/components/product/ProductKind'
import ConstructorContentList from '@/components/constructor/ConstructorContentList'
import AppButton from '@/components/AppButton'
import AppPageTitle from '@/components/AppPageTitle'
import constructor from '../components/constructor/default.constructor'
import AppNotification from '@/components/AppNotification'
import AppScaleLoader from '@/components/AppScaleLoader'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Constructor',
  components:{
    ConstructorCategories,
    ConstructorIngredients,
    ProductVariety,
    ProductKind,
    ConstructorContentList,
    AppButton,
    AppPageTitle,
    AppNotification,
    AppScaleLoader
  },
  data: () =>({
    activeCategory: {},
    defaultProduct: {},
    btnName: 'в корзину',
    newTitle: '',
    added: false,
    loader: false,
    title: 'Соберите свою пиццу',
    subtitle: 'У пиццы может быть до 10 любых ингредиентов, иначе она просто не пропечется'
  }),
  computed:{
    ...mapGetters({
      getIngredientCategories: 'ingredientCategory/getIngredientCategories',
      getIngredients: 'ingredient/getIngredients',
      getConstructorProduct: 'productConstructor/getConstructorProduct',
      getTotal: 'productConstructor/getTotal',
      getIngredientsLength: 'productConstructor/getIngredientsLength'
    })
  },
  methods:{
    ...mapActions({
      fetchAllIngredientCategories: 'ingredientCategory/fetchAllIngredientCategories',
      fetchAllIngredients: 'ingredient/fetchAllIngredients',
      startingActiveProduct: 'product/startingActiveProduct',
      changeVarietyProduct: 'product/changeVarietyProduct',
      changeKindProduct: 'product/changeKindProduct',
      fetchProduct: 'product/fetchProduct',
      searchIngredientsProduct: 'ingredient/searchIngredientsProduct',
      setConstructorProduct: 'productConstructor/setConstructorProduct',
      calculateTotal: 'productConstructor/calculateTotal',
      calculateIngredientsLength: 'productConstructor/calculateIngredientsLength',
      removedIngredientsFromQuery: 'productConstructor/removedIngredientsFromQuery',
      getProductsFromLocal: 'basket/getProductsFromLocal',
      addInBasket: 'basket/addInBasket'
    }),
    changeCategoryHandler(category){
      this.activeCategory = category
    },
    async addProduct(){
      this.added = true

      if(!this.newTitle){
        this.getConstructorProduct.title = 'Создай свою пиццу'
      }else{
        this.getConstructorProduct.title = this.newTitle
      }

      this.getConstructorProduct.price = this.getTotal
      await this.getProductsFromLocal()
      this.addInBasket(this.getConstructorProduct)
    },
    async changeVarietyHandler(){
      this.calculateTotal(this.getConstructorProduct)
    },
    async changeKindHandler(){
      this.calculateTotal(this.getConstructorProduct)
    },
    markedIngredientsOwner(ingredients){
      ingredients.forEach(ingredient =>{
        ingredient.count = 1
        ingredient.owner = true
      })
      this.calculateIngredientsLength()
    }
  },
  async mounted(){
    this.loader = true
    await this.fetchAllIngredients()

    this.getIngredients.forEach(ingredient =>{
      this.$set(ingredient, 'count', 0)
    })

    if(this.$route.query.id){
      const constructor = await this.fetchProduct(this.$route.query.id)
      const product = await this.startingActiveProduct(constructor)
      await this.setConstructorProduct(product)
      this.defaultProduct = constructor
      this.newTitle = this.defaultProduct.title
    }else{
      const product = await this.startingActiveProduct(constructor)
      await this.setConstructorProduct(product)
      this.defaultProduct = constructor
    }

    await this.searchIngredientsProduct(this.getConstructorProduct)
    this.markedIngredientsOwner(this.getConstructorProduct.ingredients)
    this.calculateTotal(this.getConstructorProduct)
    this.loader = false
    await this.fetchAllIngredientCategories()
    this.activeCategory = this.getIngredientCategories[0]

    if(this.$route.query.removedIngredient){
      this.removedIngredientsFromQuery(this.$route.query.removedIngredient)
    }
  }
}
</script>

<style lang="scss" scoped>
.constructor{
  padding-top: 50px;
  background-color: #f8f8f8;
  min-height: 100vh;
}

.container{
  max-width: 1000px;
  margin: 0 auto;
}

.constructor__body{
  position: relative;
  display: flex;
  align-items: flex-start;
  padding: 50px 64px;
  background-color: #fff;
}

.constructor__row{
  display: flex;
}

.product__kinds{
  padding: 0 20px;
  margin-bottom: 32px;
}

.edit-icon{
  position: absolute;
  right: 0;
  top: 0;
  width: 20px;
  height: 20px;
}

.ingredients__column{
  width: 60%;
  margin-right: 30px;
}

.product__column{
  width: 40%;
}

.product__img-wrapper{
  height: 200px;
  margin-bottom: 20px;
}

.product__img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product__info{
  position: relative;
  padding: 0 20px;
  margin-bottom: 30px;
}

.product__title{
  display: inline-block;
  color: #70544f;
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  width: 100%;
  padding: 0 10px;
  margin-bottom: 30px;
}

.product__content{
  margin-bottom: 32px;
}

.content__title{
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 15px;
}

.product__actions{
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.total__name{
  margin-bottom: 5px;
  font-size: 12px;
}

.product__total{
  text-align: right;
}

.total__number{
  font-size: 18px;
  font-weight: 600;
  & span{
    font-weight: 400;
  }
}

.danger__message{
  margin-top: 30px;
  color: #C21313;
  font-size: 12px;
}

.wrapper__loader{
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
</style>