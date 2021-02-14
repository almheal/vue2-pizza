<template>
  <div class="product" v-if="!product.filter">
    <div class="product__top">
      <div class="product__picture">
        <v-lazy-image class="product__img" :src="activeProduct.img ? activeProduct.img : ''" alt="product"/>
        <div class="wrapper__btn" v-if="product.ingredients.length">
          <ingredient-btn
            :counter="counterRemovedIngredients"
            @openItem="toggleIngredients"
          />
        </div>
        <div class="wrapper__items" v-if="product.tags.length || activeProduct.kind">
          <product-tags :tags="product.tags"/>
          <div class="wrapper__icons">
            <product-feature v-if="product.features.length" :features="product.features"/>
            <product-person v-if="activeProduct.kind" :persons="activeProduct.kind.value[0].value"/>
          </div>
        </div>
      </div>
      <div class="product__body">
        <div class="info">
          <div class="wrapper__title">
            <div class="product__title">{{product.title}}</div>
          </div>
          <div class="product__description">{{product.description}}</div>
        </div>
        <product-values-btn v-if="activeProduct.kind" :values="activeProduct.kind.value"/>
      </div>
    </div>
    <div class="product__body">
        <product-variety
          v-if="activeProduct.variety"
          :variety="product.variety"
          :activeVariety="activeProduct.variety"
          @changeVariety="changeVarietyHandler"
        />
        <product-kind
          v-if="activeProduct.kind"
          :kinds="activeProduct.variety.kind"
          :activeKind="activeProduct.kind"
          @changeKind="changeKindHandler"
        />
      <div class="product__actions">
        <app-button :name="btnName" @buttonOnClick="addProductHandler"/>
        <product-price :price="activeProduct.price"/>
      </div>
    </div>
    <template v-if="product.ingredients.length && product.ingredients[0]">
      <product-ingredients
        v-show="product.ingredients.length && poppup"
        :product="product"
        @cancelIngredients="toggleIngredients"
        @removeIngredientHandler="removeIngredient"
        @addProduct="addProductHandler"
        @toConstructorPage="toConstructor"
      />
    </template>
  </div>
</template>

<script>
import IngredientBtn from '@/components/buttons/IngredientBtn'
import ProductTags from '@/components/product/ProductTags'
import ProductPerson from '@/components/product/ProductPerson'
import ProductFeature from '@/components/product/ProductFeature'
import ProductValuesBtn from '@/components/buttons/ProductValuesBtn'
import ProductVariety from '@/components/product/ProductVariety'
import ProductKind from '@/components/product/ProductKind'
import AppButton from '@/components/AppButton'
import ProductPrice from '@/components/product/ProductPrice'
import ProductIngredients from '@/components/product/ProductIngredients'
import VLazyImage from 'v-lazy-image'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ProductCard',
  components:{
    IngredientBtn,
    ProductTags,
    ProductPerson,
    ProductFeature,
    ProductValuesBtn,
    ProductVariety,
    ProductKind,
    AppButton,
    ProductPrice,
    ProductIngredients,
    VLazyImage
  },
  props:{
    product:{
      type: Object,
      default: () => {}
    }
  },
  data: ()=>({
    activeProduct:{},
    btnName: 'В корзину',
    poppup: false,
    counterRemovedIngredients: 0
  }),
  computed:{
    ...mapGetters({
      getTags: 'productTag/getTags',
      getFeatures: 'feature/getFeatures',
      getIngredients: 'ingredient/getIngredients'
    })
  },
  watch:{
    getTags(){
      if(this.product.tags.length){
        this.searchProductTags(this.product)
      }
    },
    getFeatures(){
      if(this.product.features.length){
        this.searchProductFeatures(this.product)
      }
    }
  },
  methods:{
    ...mapActions({
      searchProductTags: 'productTag/searchProductTags',
      searchProductFeatures: 'feature/searchProductFeatures',
      startingActiveProduct: 'product/startingActiveProduct',
      changeVarietyProduct: 'product/changeVarietyProduct',
      changeKindProduct: 'product/changeKindProduct',
      addInBasket: 'basket/addInBasket'
    }),
    changeVarietyHandler(variety){
      this.changeVarietyProduct({product: this.activeProduct, variety})
    },
    changeKindHandler(kind){
      this.changeKindProduct({product: this.activeProduct, kind})
    },
    toggleIngredients(){
      this.poppup = !this.poppup
    },
    addProductHandler(){
      const copyProduct = JSON.parse(JSON.stringify(this.activeProduct))
      this.addInBasket(copyProduct)
    },
    removeIngredient(ingredient){
      const repeatRemovedIngredient = this.activeProduct.removedIngredients.find(item => item._id === ingredient._id)
      if(repeatRemovedIngredient){
        const updatedRemovedIngredients = this.activeProduct.removedIngredients.filter(item => item._id !== ingredient._id)
        this.activeProduct.removedIngredients = updatedRemovedIngredients
        this.activeProduct.ingredients.push(repeatRemovedIngredient)

      }else{
        const updatedIngredients = this.activeProduct.ingredients.filter(item => {
          if(item._id !== ingredient._id){
            return item
          }else{
            this.activeProduct.removedIngredients.push(item)
          }
        })
        this.activeProduct.ingredients = updatedIngredients
      }
      this.counterRemovedIngredients = this.activeProduct.removedIngredients.length
    },
    toConstructor(){
      const link = this.createConstructorLink(this.activeProduct)
      this.$router.push(link)
    },
    createConstructorLink(product){
      const id = product._id
      const variety = product.variety.title
      const kind = product.kind.size
      let link = `/constructor?id=${id}&title=${variety}&kind=${kind}`
      if(product.removedIngredients.length){
        const removedIngredientsIds =
          product.removedIngredients
            .map(ingredient => ingredient._id)
            .reduce((acc, str) =>{
              acc += `&removedIngredient=${str}`
              return acc
            },'')
        link += removedIngredientsIds
      }
      return link
    }
  },
  async mounted(){
    this.activeProduct = await this.startingActiveProduct(this.product)
    this.$set(this.activeProduct, 'removedIngredients', [])
  }
}
</script>

<style lang="scss" scoped>
.product{
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 6px;
  width: 32.2%;
  margin: 0 5px;
  background-color: #fff;
  margin-bottom: 10px;
  &.hide{
    display: none;
  }
}

.product__picture{
  position: relative;
  height: 285px;
  margin-bottom: 18px;
  display: block;
}

.product__img{
  width: 100%;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

.wrapper__icons{
  position: absolute;
  right: 24px;
  bottom: 0;
  display: flex;
  align-items: center;
}

.info{
  position: relative;
}

.wrapper__title{
  position: relative;
}

.product__title{
  font-size: 18px;
  padding-right: 30px;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 6px;
  font-family: 'Gotham';
  font-weight: 700;
}

.product__description{
  color: #a69895;
  line-height: 1.4;
  margin-bottom: 24px;
}

.wrapper__items{
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  padding-right: 24px;
}

.product__body{
  position: relative;
  padding: 0 24px 24px;
}

.wrapper__btn{
  position: absolute;
  right: 16px;
  top: 16px;
}

.product__actions{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
}
</style>