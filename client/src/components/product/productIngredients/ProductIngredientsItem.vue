<template>
    <li class="ingredient"
      :class="{removed: !mark}"
      @click="removeIngredient(ingredient)"
    >
      {{ingredient.title}}
      <div class="wrapper__btn" v-if="mark">
        <BtnCross />
      </div>
      <div class="wrapper__icon" v-else>
        <svg class="reload__icon">
          <use xlink:href="#reload"></use>
        </svg>
      </div>
    </li>
</template>

<script>
import BtnCross from '@/components/buttons/BtnCross'

export default {
  name: 'ProductIngredientsItem',
  components:{
    BtnCross
  },
  props:{
    ingredient:{
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    mark: true
  }),
  methods:{
    removeIngredient(ingredient){
      this.mark = !this.mark
      this.$emit('removeIngredient', ingredient)
    }
  }
}
</script>

<style lang="scss" scoped>
.ingredient{
  position: relative;
  margin-bottom: 13px;
  font-size: 16px;
  padding-right: 25px;
  line-height: 1.2;
  cursor: pointer;
  &:hover .remove__btn::before,
  &:hover .remove__btn::after{
    background-color: #C21313;
    transition: .3s;
  }
  &:hover .reload__icon{
    fill: #009471;
    transition: .3s;
  }
  &.removed{
    text-decoration: line-through;
    color: #E6E2E1;
    transition: .3s;
  }
}

.wrapper__btn{
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%)
}

.wrapper__icon{
  width: 12px;
  height: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%)
}

.reload__icon{
  width: 12px;
  height: 12px;
  fill: #E6E2E1;
  transition: .3s
}
</style>