<template>
  <app-form
    :text="text"
    :button="button"
    :disable="!getValidInputs"
    @clickOnCross="closeModal"
    @clickOnText="toRegisterForm"
    @clickFormButton="registerHandler"
  >
    <div class="form-group">
      <label class="input__name">Пароль</label>
      <input type="text" class="input" v-model="getRegisterUser.password">
    </div>
    <div class="form-group">
      <label class="input__name">Повторите пароль</label>
      <input type="text" class="input" v-model="getRegisterUser.repeatPassword">
    </div>
    <div class="error" v-if="error">{{error}}</div>
  </app-form>
</template>

<script>
import AppForm from '@/components/login/AppForm'
import { mapActions, mapGetters } from 'vuex'
import {required, minLength} from 'vuelidate/lib/validators'

export default {
  name: 'AppPasswordForm',
  components:{
    AppForm
  },
  data: () => ({
    text: 'Назад',
    button: 'Продолжить',
    error: ''
  }),
  computed:{
    ...mapGetters({
      getRegisterUser: 'user/getRegisterUser'
    }),
    getValidInputs(){
      const validationProperties = ['password','repeatPassword']
      const someValid = validationProperties.every(item => !this.$v.getRegisterUser[item].$invalid)
      return someValid
    },
  },
  methods:{
    ...mapActions({
      register: 'user/register'
    }),
    toRegisterForm(){
      this.$emit('toRegisterForm')
    },
    closeModal(){
      this.$emit('closePasswordModal')
    },
    async registerHandler(){
      if(!this.getValidInputs) return
      if(this.getRegisterUser.password !== this.getRegisterUser.repeatPassword){
        this.error = 'Пароли не совпадают'
        return
      }
      await this.register(this.getRegisterUser)
    }
  },
  validations:{
    getRegisterUser:{
      password: {required, minLength: minLength(6)},
      repeatPassword: {required, minLength: minLength(6)}
    }
  }
}
</script>

<style lang="scss" scoped>
.error{
  font-size: 12px;
  color: red;
}
</style>