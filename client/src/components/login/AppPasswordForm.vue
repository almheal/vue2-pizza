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
      <input type="password" class="input" v-model="getRegisterUser.password">
    </div>
    <div class="form-group">
      <label class="input__name">Повторите пароль</label>
      <input type="password" class="input" v-model="getRegisterUser.repeatPassword">
    </div>
    <div class="notification" v-if="getUserMessage">{{getUserMessage}}</div>
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
      getRegisterUser: 'user/getRegisterUser',
      getUserMessage: 'user/getUserMessage'
    }),
    getValidInputs(){
      const validationProperties = ['password','repeatPassword']
      const someValid = validationProperties.every(item => !this.$v.getRegisterUser[item].$invalid)
      return someValid
    },
  },
  methods:{
    ...mapActions({
      register: 'user/register',
    }),
    toRegisterForm(){
      this.$emit('toRegisterForm')
    },
    closeModal(){
      this.$emit('closePasswordModal')
    },
    async registerHandler(){
      if(!this.getValidInputs) return
      const response = await this.register(this.getRegisterUser)
      if(response.status === 400) return
      this.closeModal()
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
.notification{
  font-size: 12px;
  line-height: 1.3;
  margin-bottom: 15px;
}
</style>