<template>
  <div class="wrapper">
    <div class="order__section">
      <div class="section__header">
        <basket-title
          class="mr-35"
          :title="'Доставка'"
        />
        <basket-title
          class="color-grey"
          :title="'Самовывоз'"
        />
      </div>
      <div class="forms" :class="{'mb-0': !isIntercom}">
        <div class="form-group">
          <label class="input__name">Адрес *</label>
          <input class="input" type="text"
            :placeholder="'Адрес'"
            @input="changeDeliveryInput({value: $event.target.value, property: 'address'})"
            >
        </div>
        <div class="form-group width-50 mr-10">
          <input class="input" type="text"
            :placeholder="'Квартира'"
            @input="changeDeliveryInput({value: $event.target.value, property: 'appartament'})"
          >
        </div>
        <div class="form-group width-50 ml-10">
          <input class="input" type="text"
            :placeholder="'Этаж'"
            @input="changeDeliveryInput({value: $event.target.value, property: 'floor'})"
          >
        </div>
        <div class="dropdown__title" @click="intercomDropdown">
          Указать домофон и подъезд
          <app-triangle-icon :anim="isIntercom"/>
        </div>
      </div>
      <div
        class="forms delivery"
        :class="{
          'intercom-show': isIntercom,
          'intercom-hide': !isIntercom
        }">
        <div class="form-group width-50 mr-10">
          <input class="input" type="text"
            :placeholder="'Домофон'"
            @input="changeDeliveryInput({value: $event.target.value, property: 'intercom'})"
          >
        </div>
        <div class="form-group width-50 ml-10">
          <input class="input" type="text"
            :placeholder="'Подъезд'"
            @input="changeDeliveryInput({value: $event.target.value, property: 'entrance'})"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BasketTitle from '@/components/basket/BasketTitle'
import AppTriangleIcon from '@/components/AppTriangleIcon'

export default {
  name: 'OrderDelivery',
  components:{
    BasketTitle,
    AppTriangleIcon
  },
  props:{
    address:{
      type: String,
      required: true
    },
    appartament:{
      type: String,
      required: true
    },
    floor:{
      type: String,
      required: true
    },
    intercom:{
      type: String,
      required: true
    },
    entrance:{
      type: String,
      required: true
    }
  },
  data: () => ({
    isIntercom: false
  }),
  methods:{
    intercomDropdown(){
      this.isIntercom = !this.isIntercom
    },
    changeDeliveryInput({value,property}){
      this.$emit('changeDeliveryInput', value, property)
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown__title{
  display: inline-block;
  position: relative;
  padding-right: 15px;
  cursor: pointer;
  color: #009471;
  font-size: 14px;
}

.forms{
  &.delivery{
    margin: 0;
  }
  &.mb-0{
    margin-bottom: 0;
    transition: .3s;
  }
}
</style>