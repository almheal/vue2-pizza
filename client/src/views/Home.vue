<template>
  <div class="home">
    <div class="home__inner" v-if="!loader">
      <app-slider :slides="slides"/>
      <div class="container">
        <div class="categories">
          <categories-list :categories="getCategories"/>
        </div>
          <div class="content">
            <div class="section__products">
              <template v-for="(section, index) in getCategories">
                <div class="section__item"
                  v-if="section.products.length"
                  :key="index"
                >
                  <div class="section__top">
                    <div class="section__title">{{section.title}}</div>
                    <template v-if="section.title === 'Пицца'">
                      <filter-icon
                        :filterCount="getFilterCount"
                        @openFilter="openFilterHandler"
                        @resetFilter="resetFilterHandler"
                      />
                    </template>
                  </div>
                  <template v-if="section.title === 'Пицца'">
                    <app-filter
                      v-show="filter"
                      :items="getIngredients"
                      :categories="getIngredientCategories"
                      @selectItemHandler="selectIngredient"
                    />
                  </template>
                  <div class="products">
                    <app-special-card
                      v-if="section.title ==='Пицца'"
                      :title="cardCreatePizza.title"
                      :img="cardCreatePizza.img"
                      :btnName="cardCreatePizza.btnName"
                      :description="cardCreatePizza.description"
                      :to="cardCreatePizza.to"
                    />
                    <app-special-card
                      v-if="section.title ==='Пицца'"
                      :title="cardHalves.title"
                      :img="cardHalves.img"
                      :btnName="cardHalves.btnName"
                      :description="cardHalves.description"
                      :to="cardHalves.to"
                    />
                    <template v-for="(product, index) in getProducts">
                      <product-card
                        v-if="product.category === section._id"
                        :key="index"
                        :product="product"
                      />
                    </template>
                  </div>
                </div>
              </template>
            </div>
            <app-basket />
          </div>
      </div>
    </div>
    <div class="wrapper__loader" v-else>
    <app-scale-loader :loader="loader"/>
  </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AppSlider from '@/components/AppSlider'
import CategoriesList from '@/components/categories/CategoriesList'
import FilterIcon from '@/components/filter/FilterIcon'
import AppFilter from '@/components/filter/AppFilter'
import ProductCard from '@/components/product/ProductCard'
import AppBasket from '@/components/basket/AppBasket'
import AppSpecialCard from '@/components/AppSpecialCard'
import AppScaleLoader from '@/components/AppScaleLoader'


export default {
  name: 'Home',
  components: {
    AppSlider,
    CategoriesList,
    FilterIcon,
    AppFilter,
    ProductCard,
    AppBasket,
    AppSpecialCard,
    AppScaleLoader
  },
  data: ()=>({
    loader: false,
    filter: false,
    cardCreatePizza:{
      title: 'Создай свою пиццу',
      img: 'create-pizza.png',
      btnName: 'Создать пиццу',
      description: 'Любые ингредиенты',
      to: '/constructor'
    },
    cardHalves:{
      title: 'Пицца половинки',
      img: 'halves-pizza.png',
      btnName: 'Выбрать пиццу',
      description: 'Соедини 2 любимых вкуса',
      to: '/halves'
    },
    slides: ['slide-1','slide-2','slide-3','slide-4','slide-5','slide-6','slide-7','slide-8']
  }),
  computed:{
    ...mapGetters({
      getCategories: 'category/getCategories',
      getProducts: 'product/getProducts',
      getPizza: 'product/getPizza',
      getIngredientCategories: 'ingredientCategory/getIngredientCategories',
      getIngredients: 'ingredient/getIngredients',
      getFilterIngredients: 'ingredient/getFilterIngredients',
      getFilterCount: 'ingredient/getFilterCount'
    })
  },
  methods:{
    ...mapActions({
      fetchCategories: 'category/fetchCategories',
      searchCategoryByTitle: 'category/searchCategoryByTitle',
      fetchAllProducts: 'product/fetchAllProducts',
      resetFilterProducts: 'product/resetFilterProducts',
      searchProductsByCategory: 'product/searchProductsByCategory',
      setPizzaProducts: 'product/setPizzaProducts',
      filterProductsByIngredients: 'product/filterProductsByIngredients',
      fetchAllTags: 'productTag/fetchAllTags',
      fetchFeatures: 'feature/fetchFeatures',
      fetchAllIngredients: 'ingredient/fetchAllIngredients',
      filterIngredients: 'ingredient/filterIngredients',
      disableIngredients: 'ingredient/disableIngredients',
      resetFilterIngredients: 'ingredient/resetFilterIngredients',
      searchIngredientsProduct: 'ingredient/searchIngredientsProduct',
      fetchAllIngredientCategories: 'ingredientCategory/fetchAllIngredientCategories'
    }),
    async openFilterHandler(){
      this.filter = !this.filter
    },
    async selectIngredient(ingredient){
      await this.filterIngredients(ingredient)
      const products = await this.filterProductsByIngredients({products: this.getPizza, ingredients: this.getFilterIngredients})
      this.disableIngredients(products)
    },
    async resetFilterHandler(){
      await this.resetFilterProducts(this.getPizza)
      await this.resetFilterIngredients()
      this.disableIngredients(this.getPizza)
    }
  },
  async mounted(){
    this.loader = true
    await this.fetchCategories()
    await this.fetchAllProducts()
    await this.fetchAllIngredients()
    const category = await this.searchCategoryByTitle('Пицца')
    const pizza = await this.searchProductsByCategory(category)
    pizza.forEach(product => {
      this.$set(product, 'filter', false)
      this.searchIngredientsProduct(product)
    })
    await this.setPizzaProducts(pizza)
    this.getIngredients.forEach(ingredient =>{
      this.$set(ingredient,'disable', false)
      this.$set(ingredient, 'active', false)
    })
    this.loader = false
    this.fetchAllTags()
    this.fetchFeatures()
    this.fetchAllIngredientCategories()
    this.disableIngredients(pizza)
  },
  beforeDestroy(){
    this.resetFilterHandler()
  }
}
</script>

<style lang="scss" scoped>
.home{
  background-color: #f8f8f8;
  min-height: 100vh;
}

.home__inner{
  padding: 40px 0;
  min-height: 100vh;
}

.categories{
  margin-bottom: 36px;
}

.content{
  display: flex;
  align-items: flex-start;
}

.wrapper__loader{
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}

.section__products{
  width: 75%;
}

.section__item{
  margin-bottom: 80px;
  & .section__title{
    margin-right: 16px;
    font-size: 24px;
    font-family: 'Gotham';
    font-weight: 700;
}
}

.section__top{
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.products{
  display: flex;
  flex-wrap: wrap;
}
</style>
