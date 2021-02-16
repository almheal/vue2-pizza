<template>
  <app-form
    :text="text"
    :button="button"
    :disable="!getValidInputs"
    @clickOnCross="closeModal"
    @clickOnText="toLogin"
    @clickFormButton="toPassword"
  >
    <div class="form-group" v-for="(input, index) in inputs" :key="index">
      <label class="input__name">{{input.label}}</label>
      <input type="text" class="input" v-model="getRegisterUser[input.property]">
    </div>
    <div class="notification" v-if="getUserMessage">{{getUserMessage}}</div>
  </app-form>
</template>

<script>
import AppForm from '@/components/login/AppForm'
import { mapActions, mapGetters } from 'vuex'
import {required, email, minLength, maxLength} from 'vuelidate/lib/validators'

export default {
  name: 'AppRegister',
  components:{
    AppForm
  },
  data: () => ({
    text: 'Отмена',
    button: 'Продолжить',
    inputs: [
      {
        label: 'Имя *',
        property: 'name'
      },
      {
        label: 'Номер телефона *',
        property: 'number'
      },
      {
        label: 'Email *',
        property: 'email'
      },
    ]
  }),
  computed:{
    ...mapGetters({
      getRegisterUser: 'user/getRegisterUser',
      getUserMessage: 'user/getUserMessage'
    }),
    getValidInputs(){
      const validationProperties = ['name','number','email']
      const someValid = validationProperties.every(item => !this.$v.getRegisterUser[item].$invalid)
      return someValid
    }
  },
  methods:{
    ...mapActions({
      fetchExistingUser: 'user/fetchExistingUser',
      changeMessage: 'user/changeMessage'
    }),
    toLogin(){
      this.$emit('toLogin')
    },
    closeModal(){
      this.$emit('closeRegisterModal')
    },
    async toPassword(){
      if(!this.getValidInputs) return
      const response = await this.fetchExistingUser(this.getRegisterUser)
      if(response && response.status === 200){
        this.$emit('toPassword')
        this.changeMessage('')
      }

    }
  },
  validations:{
    getRegisterUser:{
      name: {required},
      number: {required, minLength: minLength(11), maxLength: maxLength(11)},
      email: {required, email}
    }
  }
}
</script>

<style lang="scss">
.notification{
  font-size: 12px;
  line-height: 1.3;
  margin-bottom: 15px;
}
</style>