<template>
  <div class="login">
    <div class="wrapper__btn">
      <btn-cross @btnOnClick="clickOnCross"/>
    </div>
    <div class="login__inner">
      <slot></slot>
      <div class="form__actions">
        <div class="action__item" @click="clickOnText">{{text}}</div>
        <div class="action__item">
          <app-button
            :name="button"
            :disable="disable"
            @buttonOnClick="clickFormButton"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BtnCross from '@/components/buttons/BtnCross'
import AppButton from '@/components/AppButton'

export default {
  name: 'AppForm',
  components:{
    BtnCross,
    AppButton
  },
  props:{
    text:{
      type: String,
      default: ''
    },
    button: {
      type: String,
      required: true
    },
    disable:{
      type: Boolean,
      default: false
    }
  },
  methods:{
    clickOnText(){
      this.$emit('clickOnText')
    },
    clickFormButton(){
      this.$emit('clickFormButton')
    },
    clickOnCross(){
      this.$emit('clickOnCross')
    }
  }
}
</script>

<style lang="scss" scoped>
.login{
  position: absolute;
  right: 0;
  top: calc(100% + 10px);
  z-index: 200;
}

.login__inner{
  width: 340px;
  padding: 40px 24px 24px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 12px 0 rgba(41, 44, 51, 0.2);
}

.wrapper__btn{
  position: absolute;
  right: 20px;
  top: 20px;
}

.form__actions{
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.action__item{
  width: 50%;
  color: #009471;
  cursor: pointer;
  &:first-child{
    margin-right: 30px;
  }
  &:last-child{
    display: flex;
    justify-content: flex-end;
  }
}
</style>