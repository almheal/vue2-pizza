<template>
  <app-form
    :text="text"
    :button="button"
    :disable="!getValidInputs"
    @clickOnCross="closeModal"
    @clickOnText="toRegister"
    @clickFormButton="loginHandler"
  >
    <div class="form-group">
      <label class="input__name">Номер телефона</label>
      <input type="number" class="input" v-model="user.number">
    </div>
    <div class="form-group">
      <label class="input__name">Пароль</label>
      <input type="password" class="input" v-model="user.password">
    </div>
    <div class="notification" v-if="getUserMessage">{{getUserMessage}}</div>
  </app-form>
</template>

<script>
import AppForm from '@/components/login/AppForm'
import { mapActions, mapGetters } from 'vuex'
import {required, minLength, maxLength} from 'vuelidate/lib/validators'


export default {
  name: 'AppLogin',
  components:{
    AppForm,
  },
  data: () => ({
    user:{
      number: '',
      password: ''
    },
    text: 'Регистрация',
    button: 'Войти'
  }),
  computed:{
    ...mapGetters({
      getUserMessage: 'user/getUserMessage'
    }),
    getValidInputs(){
      const validationProperties = ['number', 'password']
      const valid = validationProperties.every(property => !this.$v.user[property].$invalid !== false)
      return valid
    }
  },
  methods:{
    ...mapActions({
      login: 'user/login'
    }),
    async loginHandler(){
      if(!this.getValidInputs) return
      const response = await this.login(this.user)
      if(response.status === 200){
        this.closeModal()
      }
    },
    toRegister(){
      this.$emit('toRegister')
    },
    closeModal(){
      this.$emit('closeLoginModal')
    }
  },
  validations:{
    user:{
      number: {required, minLength: minLength(11), maxLength: maxLength(11)},
      password: {required, minLength: minLength(6)}
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