<template>
  <app-form
    :text="text"
    :button="button"
    :disable="!getValidInputs"
    @clickOnCross="closeModal"
    @clickOnText="toLogin"
    @clickFormButton="toPassword"
  >
    <div class="form-group">
      <label class="input__name">Имя *</label>
      <input type="text" class="input" v-model="getRegisterUser.name">
    </div>
    <div class="form-group">
      <label class="input__name">Номер телефона *</label>
      <input type="number" class="input" v-model="getRegisterUser.number">
    </div>
    <div class="form-group">
      <label class="input__name">Email *</label>
      <input type="text" class="input" v-model="getRegisterUser.email">
    </div>
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
    button: 'Продолжить'
  }),
  computed:{
    ...mapGetters({
      getRegisterUser: 'user/getRegisterUser'
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
    }),
    toLogin(){
      this.$emit('toLogin')
    },
    closeModal(){
      this.$emit('closeRegisterModal')
    },
    async toPassword(){
      if(!this.getValidInputs) return
      const res = await this.fetchExistingUser(this.getRegisterUser)
      if(res.status === 200){
        this.$emit('toPassword')
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