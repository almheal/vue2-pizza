<template>
  <div class="order__section">
    <basket-title
      class="cursor-default"
      :title="title"
    />
    <div class="forms">
      <div class="form-group width-50 mr-10">
        <label class="input__name">Имя *</label>
        <input class="input" type="text" :value="name" @input="changeContactInput({value: $event.target.value, property: 'name'})">
      </div>
      <div class="form-group width-50 ml-10">
        <label class="input__name">Номер телефона *</label>
        <input class="input" type="number" :value="number" @input="changeContactInput({value: $event.target.value, property: 'number'})">
      </div>
      <div class="form-group width-50">
        <label class="input__name">E-mail *</label>
        <input class="input" type="text" :value="email" @input="changeContactInput({value: $event.target.value, property: 'email'})">
      </div>
    </div>
  </div>
</template>

<script>
import BasketTitle from '@/components/basket/BasketTitle'

export default {
  name: 'OrderContacts',
  components:{
    BasketTitle
  },
  props:{
    name: {
      type: String,
      required: true
    },
    number:{
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  data: () => ({
    title: 'Контактная информация'
  }),
  methods:{
    changeContactInput({value, property}){
      this.$emit('changeContactInput', value, property)
    }
  }
}
</script>


<style lang="scss" scoped>

</style>