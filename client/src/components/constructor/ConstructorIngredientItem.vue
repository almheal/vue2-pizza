<template>
  <div class="wrapper__ingredient">
      <div class="wrapper__img">
        <img class="ingredient__icon" :src="ingredient.img" alt="ingredient">
      </div>
      <div class="ingredient__name">{{ingredient.title}}</div>
    <div class="ingredient__price">{{ingredient.price}} <span>₽</span></div>
  </div>
</template>


<script>
export default {
  name: 'IngredientItem',
  props:{
    ingredient:{
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper__ingredient{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.wrapper__img{
  margin-bottom: 10px;
  min-height: 50px;
}

.ingredient__name{
  color: #70544f;
  font-weight: 700;
  line-height: 1.3;
  font-size: 12px;
  margin-bottom: 10px;
}

.ingredient__price{
  font-weight: 600;
  & span{
    font-size: 12px;
    font-weight: 400;
  }
}
</style>