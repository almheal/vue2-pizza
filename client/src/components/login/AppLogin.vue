<template>
  <app-form
    :text="text"
    :button="button"
    @clickOnCross="closeModal"
    @clickOnText="toRegister"
  >
    <div class="form-group">
      <label class="input__name">Номер телефона</label>
      <input type="number" class="input">
    </div>
    <div class="form-group">
      <label class="input__name">Пароль</label>
      <input type="text" class="input">
    </div>
  </app-form>
</template>

<script>
import AppForm from '@/components/login/AppForm'


export default {
  name: 'AppLogin',
  components:{
    AppForm,
  },
  data: () => ({
    text: 'Регистрация',
    button: 'Войти'
  }),
  methods:{
    toRegister(){
      this.$emit('toRegister')
    },
    closeModal(){
      this.$emit('closeLoginModal')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>