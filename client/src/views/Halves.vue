<template>
  <div class="halves">
    <div class="container">
      <div class="halves__inner" v-if="!added && !loader">
        <app-page-title
          :title="title"
          :subtitle="subtitle"
        />
        <div class="halves__body">
          <halves-list
            :products="getPizza"
            :activeTitle="getLeftProduct ? getLeftProduct.title : ''"
            :disableTitle="getRightProduct ? getRightProduct.title : ''"
            @selectProductHandler="selectLeftProduct"
          />
          <div class="halves__content">
            <div class="content__top">
              <div class="top__item left">
                <div class="top__name">Левая половинка</div>
                <div class="item__status selected" v-if="getLeftProduct">{{getLeftProduct.title}}</div>
                <div class="item__status" v-else>Не выбрана</div>
              </div>
              <div class="top__item right">
                <div class="top__name">Правая половинка</div>
                <div class="item__status selected" v-if="getRightProduct">{{getRightProduct.title}}</div>
                <div class="item__status" v-else>Не выбрана</div>
              </div>
            </div>
            <div class="halves__row__img">
              <div class="img__item">
                <img class="halves__img" v-if="getLeftProduct" src="../assets/selected-left-pizza.svg" alt="halves-pizza">
                <img class="halves__img" v-else src="../assets/left-pizza.svg" alt="halves-pizza">
              </div>
              <div class="img__item">
                <img class="halves__img" v-if="getRightProduct" src="../assets/selected-right-pizza.svg" alt="halves-pizza">
                <img class="halves__img" v-else src="../assets/right-pizza.svg" alt="halves-pizza">
              </div>
            </div>
            <div class="content__text"
              v-if="!getLeftProduct || !getRightProduct"
            >Сначала выберите обе половинки своей пиццы. После этого можно будет указать тесто, борт и размер.</div>
            <template v-else>
              <div class="product__content">
                <product-variety
                  v-if="activeProduct.variety"
                  :variety="getHalvesProduct.variety"
                  :activeVariety="activeProduct.variety"
                  @changeVariety="changeVarietyHandler"
                />
                <product-kind
                  v-if="activeProduct.variety"
                  :kinds="activeProduct.variety.kind"
                  :activeKind="activeProduct.kind"
                  @changeKind="changeKindHandler"
                />
                <div class="product__actions">
                  <app-button :name="btnName" @buttonOnClick="addProduct"/>
                  <product-price :price="activeProduct.price"/>
                </div>
              </div>
            </template>
          </div>
          <halves-list
            :products="getPizza"
            :activeTitle="getRightProduct ? getRightProduct.title : ''"
            :disableTitle="getLeftProduct ? getLeftProduct.title : ''"
            @selectProductHandler="selectRightProduct"
          />
        </div>
      </div>
      <app-notification
        v-if="added"
        :title="activeProduct ? `Пицца «${activeProduct.title}» добавлена в корзину` : ''"
      />
      <div class="wrapper__loader" v-if="loader && !added">
        <app-scale-loader :loader="loader" />
      </div>
    </div>
  </div>
</template>

<script>
import HalvesList from '@/components/halves/HalvesList'
import ProductVariety from '@/components/product/ProductVariety'
import ProductKind from '@/components/product/ProductKind'
import ProductPrice from '@/components/product/ProductPrice'
import AppButton from '@/components/AppButton'
import AppPageTitle from '@/components/AppPageTitle'
import AppNotification from '@/components/AppNotification'
import AppScaleLoader from '@/components/AppScaleLoader'
import halvesConstructor from '../components/halves/halves.constructor'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Halves',
  components:{
    HalvesList,
    ProductVariety,
    ProductKind,
    ProductPrice,
    AppButton,
    AppPageTitle,
    AppNotification,
    AppScaleLoader
  },
  data: () => ({
    pizzaTitles: ['Вегетарианская', 'Мексиканская', 'Пепперони', 'Супер Папа', 'Гавайская', 'Сырная'],
    activeProduct: {},
    btnName: 'в корзину',
    added: false,
    loader: false,
    title: 'Пицца Половинки',
    subtitle: 'Соедини 2 любимых вкуса'
  }),
  computed:{
    ...mapGetters({
      getPizza: 'product/getPizza',
      getFeatures: 'feature/getFeatures',
      getLeftProduct: 'halves/getLeftProduct',
      getRightProduct: 'halves/getRightProduct',
      getHalvesProduct: 'halves/getHalvesProduct'
    })
  },
  watch:{
    getFeatures(){
      this.getPizza.forEach(product =>{
        this.searchProductFeatures(product)
      })
    }
  },
  methods:{
    ...mapActions({
      fetchAllIngredients: 'ingredient/fetchAllIngredients',
      searchIngredientsProduct: 'ingredient/searchIngredientsProduct',
      fetchCategories: 'category/fetchCategories',
      searchCategoryByTitle: 'category/searchCategoryByTitle',
      fetchAllProducts: 'product/fetchAllProducts',
      searchProductsByCategory: 'product/searchProductsByCategory',
      setPizzaProducts: 'product/setPizzaProducts',
      searchProductsByTitles: 'product/searchProductsByTitles',
      startingActiveProduct: 'product/startingActiveProduct',
      changeVarietyProduct: 'product/changeVarietyProduct',
      changeKindProduct: 'product/changeKindProduct',
      setLeftProduct: 'halves/setLeftProduct',
      setRightProduct: 'halves/setRightProduct',
      setHalvesProduct: 'halves/setHalvesProduct',
      compoundIngredients: 'halves/compoundIngredients',
      addInBasket: 'basket/addInBasket',
      fetchFeatures: 'feature/fetchFeatures',
      searchProductFeatures: 'feature/searchProductFeatures'
    }),
    async addProduct(){
      this.activeProduct.title = `${this.getLeftProduct.title} + ${this.getRightProduct.title}`
      const ingredients = await this.compoundIngredients({
        leftProduct: this.getLeftProduct,
        rightProduct: this.getRightProduct
      })
      this.activeProduct.ingredients = ingredients
      await this.searchIngredientsProduct(this.activeProduct)
      await this.addInBasket(this.activeProduct)
      this.added = true
    },
    selectLeftProduct(product){
      this.setLeftProduct(product)
    },
    selectRightProduct(product){
      this.setRightProduct(product)
    },
    changeVarietyHandler(variety){
      this.changeVarietyProduct({product: this.activeProduct, variety})
    },
    changeKindHandler(kind){
      this.changeKindProduct({product: this.activeProduct, kind})
    }
  },
  async mounted(){
    this.loader = true
    await this.fetchCategories()
    await this.fetchAllProducts()
    const category = await this.searchCategoryByTitle('Пицца')
    const pizza = await this.searchProductsByCategory(category)
    const halvesProducts = await this.searchProductsByTitles({products: pizza, titles: this.pizzaTitles})
    await this.setPizzaProducts(halvesProducts)
    await this.setHalvesProduct(halvesConstructor)
    this.activeProduct = await this.startingActiveProduct(this.getHalvesProduct)
    this.loader = false
    this.fetchAllIngredients()
    this.fetchFeatures()
  },
  beforeDestroy(){
    this.setRightProduct(null)
    this.setLeftProduct(null)
  },
}
</script>

<style lang="scss" scoped>
.halves{
  background-color: #F8F8F8;
  min-height: 100vh;
  padding-top: 50px;
}

.container{
  max-width: 1000px;
  margin: 0 auto;
}

.halves__header{
  margin-bottom: 32px;
}

.halves__title{
  font-size: 40px;
  font-family: 'Gotham';
  font-weight: 700;
  margin-bottom: 10px;
}

.halves__description{
  color: #a69895;
  font-size: 16px;
}

.halves__body{
  display: flex;
  height: 584px;
}

.halves__row__img{
  display: flex;
  margin-bottom: 25px;
}

.img__item{
  width: 50%;
}

.halves__content{
  width: 100%;
  padding: 24px 20px 32px;
  margin: 0 35px;
  background-color: #fff;
}

.content__text{
  max-width: 244px;
  margin: 0 auto;
  text-align: center;
  font-weight: 600;
  font-size: 12px;
  line-height: 1.2;
}

.product__content{
  max-width: 244px;
  margin: 0 auto;
}

.product__actions{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.wrapper__loader{
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}

.content__top{
  display: flex;
  justify-content: space-between;
  margin-bottom: 80px;
}

.top__name{
  font-size: 12px;
  color: #a69895;
  margin-bottom: 8px;
}

.item__status{
  color: #e6e2e1;
  font-size: 18px;
  font-weight: 700;
}

.selected{
  color: #70544f;
}

.right{
  text-align: right;
}
</style>