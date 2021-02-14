<template>
  <div class="product__content">
    <div class="product__variety">
      <div class="variety__name">{{title}} тесто, {{kind}} см</div>
      <div class="variety__price">{{price}} <span>₽</span></div>
    </div>
      <content-list-item
        v-for="(ingredient, index) in ingredients" :key="index"
        :ingredient="ingredient"
        @removeIngredient="removeIngredientHandler"
      />
  </div>
</template>

<script>
import ContentListItem from '@/components/constructor/ContentListItem'

export default {
  name: 'ConstructorContentList',
  components:{
    ContentListItem
  },
  props:{
    ingredients:{
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    },
    price:{
      type: [Number,String],
      default: ''
    },
    kind:{
      type: [Number,String],
      default: ''
    }
  },
  methods:{
    removeIngredientHandler(ingredient){
      this.$emit('removeIngredientHandler', ingredient)
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

.variety__price{
  width: 50%;
  text-align: right;
  font-weight: 600;
  & span{
    font-weight: 400;
  }
}

</style>