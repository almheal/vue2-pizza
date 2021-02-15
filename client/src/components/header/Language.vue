<template>
  <div class="language" >
    <button class="language__item"
      :class="{fixed: activeFixed}"
      @click="toggleLanguages"
    >
      {{getLanguage}}
    </button>
    <template v-for="(language, index) in languages">
      <button class="language__item dropdown"
        v-if="language !== getLanguage && dropdown"
        :class="{fixed: activeFixed}"
        :key="index"
        @click="selectLanguage(language)"
      >
      {{language}}
    </button>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Language',
  props:{
    activeFixed:{
      type: Boolean,
      default: false
    },
  },
  data: () => ({
    languages: ['En','Ru'],
    dropdown: false
  }),
  computed:{
    ...mapGetters({
      getLanguage: 'getLanguage'
    })
  },
  methods:{
    ...mapActions({
      changeLanguage: 'changeLanguage'
    }),
    toggleLanguages(){
      this.dropdown = !this.dropdown
    },
    selectLanguage(language){
      this.changeLanguage(language)
      this.toggleLanguages()
    }
  }
}
</script>

<style lang="scss" scoped>
.language{
  position: relative;
  box-shadow: 0 2px 12px 0 rgba(41,44,51,.2);
  z-index: 100;
}

.language__item{
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 5px;
  width: 50px;
  height: 50px;
  color: #bfb7b6;
  font-size: 16px;
  font-weight: 600;
  transition: .3s;
  &:hover{
    color: #009471;
    transition: .3s;
  }
  &.fixed{
    font-size: 14px;
    width: 38px;
    height: 38px;
  }
  &.dropdown{
    position: absolute;
    left: 0;
    bottom: -100%;
  }
}
</style>