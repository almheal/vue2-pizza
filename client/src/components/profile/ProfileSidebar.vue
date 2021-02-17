<template>
  <div class="sidebar">
    <div class="sidebar__body">
      <div class="user__avatar">
        <img class="user__img" v-if="user.img" :src="user.img" alt="avatar">
        <img class="user__img" v-else src="../../assets/avatar.svg" alt="avatar">
        <div class="wrapper__camera">
          <img class="camera__img" src="../../assets/camera.svg" alt="load photo">
        </div>
        <input class="file__load" type="file" @change="loadUserImage"/>
        <btn-cross class="button__cross" @btnOnClick="removeUserImage"/>
      </div>
      <template v-for="(item, index) in infoList">
        <profile-item
          v-if="user"
          :key="index"
          :profileInfo="item"
          :user="user"
          @updateUser="updateUserHandler"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import {minLength, required, maxLength, email} from 'vuelidate/lib/validators'
import ProfileItem from '@/components/profile/ProfileItem'
import BtnCross from '@/components/buttons/BtnCross'

export default {
  name: 'ProfileSidebar',
  components:{
    ProfileItem,
    BtnCross
  },
  props:{
    user:{
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    userImage: '',
    infoList: [
      {
        property: 'name',
        invalid: ''
      },
      {
        label: 'Мой номер',
        property: 'number',
        invalid: ''
      },
      {
        label: 'E-mail',
        property: 'email',
        invalid: ''
      },
      {
        label: 'Пол',
        property: 'gender',
      },
      {
        label: 'Дата рождения',
        property: 'dateOfBirth',
      },
    ]
  }),
  methods:{
    ...mapActions({
      fetchUpdateUser: 'user/fetchUpdateUser'
    }),
    async updateUserHandler({value, item}){
      this.user[item.property] = value

      if(this.$v.$invalid){
        this.$v.$touch()
        item.invalid = 'Не корректные данные'
        return
      }

      this.infoList.forEach(item => item.invalid = '')
      await this.fetchUpdateUser(this.user)
    },
    loadUserImage(e){
      if(!e.target.files.length) return

      const files = Array.from(e.target.files)

      files.forEach(file => {
        if(!file.type.match('image')){
          return
        }
        const reader = new FileReader()

        reader.onload = ev => {
          this.user.img = ev.target.result
          this.fetchUpdateUser(this.user)
        }

        reader.readAsDataURL(file)
      })
    },
    removeUserImage(){
      const isConfirm = confirm('Вы действительно хотите удалить?')
      if(isConfirm){
        this.user.img = ''
        this.fetchUpdateUser(this.user)
      }
    }
  },
  validations:{
    user:{
      name: {required},
      number: {required, minLength: minLength(11), maxLength: maxLength(11)},
      email: {required, email},
      password: {minLength: minLength(6)}
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar{
  width: 25%;
  background-color: #fff;
  border-radius: 6px;
}

.sidebar__body{
  padding: 28px;
}

.user__avatar{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: -98px auto 28px;
  position: relative;
  bottom: 30px;
  width: 135px;
  height: 135px;
  border-radius: 50%;
  cursor: pointer;
  &::before{
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url('../../assets/avatar-background.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
  &:hover .wrapper__camera,
  &:hover .button__cross{
    opacity: 1;
    transition: .3s;
  }
}

.user__img{
  position: relative;
  width: 130px;
  height: 130px;
  z-index: 2;
  border-radius: 50%;
}

.wrapper__camera{
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background-color: rgba(112,84,79,.5);
  z-index: 50;
  opacity: 0;
  transition: .3s;
}

.camera__img{
  width: 25px;
  height: 25px;
}

.file__load{
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 50;
  cursor: pointer;
  opacity: 0;
}

.button__cross{
  position: absolute;
  right: 0;
  top: 0;
  z-index: 100;
  opacity: 0;
}
</style>