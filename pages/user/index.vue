<template>
  <div>
    <h1 class="title">
      Мой профиль
    </h1>
    <form
      class="profile"
      @submit.prevent="submitHandler"
    >
      <div class="profile-column">
        <label class="profile__label">
          Имя
          <input
            v-model="firstName"
            :class="[
              'profile__input',
              $v.firstName.$error ? 'profile__input_error' : ''
            ]"
            type="text"
          >
        </label>
        <div class="profile-column-errors">
          <small
            v-if="$v.firstName.$dirty && !$v.firstName.required"
            class="profile-column-errors__first-name"
          >
            Пожалуйста заполните поле
          </small>
          <small
            v-if="$v.firstName.$dirty && !$v.firstName.containsOnlyLatinOrCyrillicLetters"
            class="profile-column-errors__first-name"
          >
            Имя может содержать только латиницу или кириллицу
          </small>
        </div>
        <label class="profile__label">
          Фамилия
          <input
            v-model="lastName"
            :class="[
              'profile__input',
              $v.lastName.$error ? 'profile__input_error' : ''
            ]"
            type="text"
          >
        </label>
        <div class="profile-column-errors">
          <small
            v-if="$v.lastName.$dirty && !$v.lastName.required"
            class="profile-column-errors__last-name"
          >
            Пожалуйста заполните поле
          </small>
          <small
            v-if="$v.lastName.$dirty && !$v.lastName.containsOnlyLatinOrCyrillicLetters"
            class="profile-column-errors__last-name"
          >
            Фамилмя может содержать только латиницу или кириллицу
          </small>
        </div>
      </div>
      <div class="profile-column">
        <label class="profile__label">
          Сменить пароль
          <input
            v-model="newPassword"
            :class="[
              'profile__input',
              $v.newPassword.$error ? 'profile__input_error' : ''
            ]"
            type="text"
          >
        </label>
        <div class="profile-column-errors">
          <small
            v-if="$v.newPassword.$dirty
              && (!$v.newPassword.containsOnlyPassword
                || (!$v.newPassword.minLength || !$v.newPassword.maxLength)
                || (
                  !$v.newPassword.containsLowercase
                  || !$v.newPassword.containsUppercase
                  || !$v.newPassword.containsNumber
                  || !$v.newPassword.containsSpecial
                ))"
            class="profile-column-errors__new-password"
          >
            Пароль введен некорректно
          </small>
        </div>
        <label class="profile__label">
          Сменить логин
          <input
            v-model="newLogin"
            :class="[
              'profile__input',
              $v.newLogin.$error ? 'profile__input_error' : ''
            ]"
            type="text"
          >
        </label>
        <div class="profile-column-errors">
          <small
            v-if="$v.newLogin.$dirty
              && (!$v.newLogin.containsOnlyLatinLetters
                || (!$v.newLogin.minLength || !$v.newLogin.maxLength))"
            class="profile-column-errors__new-login"
          >
            Логин введен некорректно
          </small>
        </div>
        <button class="profile__button">
          Сохранить
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
  required, maxLength, minLength
} from 'vuelidate/lib/validators'
import
{
  containsUppercase,
  containsLowercase,
  containsNumber,
  containsSpecial,
  containsOnlyLatinLetters,
  containsOnlyPassword,
  containsOnlyLatinOrCyrillicLetters
} from '@/assets/utils/customVuelidate'

export default {
  mixins: [validationMixin],
  data () {
    return {
      firstName: '',
      lastName: '',
      newLogin: '',
      newPassword: ''
    }
  },
  created () {
    this.$v.firstName.$touch()
    this.$v.lastName.$touch()

    this.firstName = this.$store.getters['user/firstName'] ?? ''
    this.lastName = this.$store.getters['user/lastName'] ?? ''
  },
  methods: {
    submitHandler () {
      if (this.newLogin !== '') {
        this.$v.newLogin.$touch()

        if (!this.$v.newLogin.$error) {
          this.$store.commit('user/setLogin', this.newLogin)
        }
      }

      if (this.newPassword !== '') {
        this.$v.newPassword.$touch()

        if (!this.$v.newPassword.$error) {
          this.$store.commit('user/setPassword', this.newPassword)
        }
      }

      if (!this.$v.firstName.$error) {
        this.$store.commit('user/setFirstName', this.firstName)
      }

      if (!this.$v.lastName.$error) {
        this.$store.commit('user/setLastName', this.lastName)
      }
    }
  },
  validations () {
    return {
      firstName: {
        required,
        containsOnlyLatinOrCyrillicLetters
      },
      lastName: {
        required,
        containsOnlyLatinOrCyrillicLetters
      },
      newLogin: {
        containsOnlyLatinLetters,
        minLength: minLength(3),
        maxLength: maxLength(20)
      },
      newPassword: {
        containsOnlyPassword,
        minLength: minLength(8),
        maxLength: maxLength(25),
        containsLowercase,
        containsUppercase,
        containsNumber,
        containsSpecial
      }
    }
  },
  layout: 'main',
  middleware: 'checkAuth'
}
</script>

<style lang='scss'>
@import '../../assets/style/mixins';

@include title();

.profile {
  display: flex;
  min-height: 252px;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 24px;
  background: #fff;
  border-radius: 10px;

  &-column {
    position: relative;

    &:nth-child(2) {
      margin-bottom: 90px;
    }

    &-errors {
      position: absolute;
      width: 100%;
      margin-bottom: 15px;
      white-space: nowrap;

      &__first-name,
      &__last-name,
      &__new-login,
      &__new-password {
        display: block;
        width: 100%;
        margin-bottom: 5px;
        color: #d6073d;
        font-size: smaller;
        text-align: left;
      }
    }
  }

  &__label {
    display: block;
    margin-top: 24px;
    color: #6f849c;
    font-size: 14px;
  }

  &:focus {
    border-color: #6f849c;
  }

  &__input {
    display: block;
    width: 360px;
    border: 0;
    border-bottom: 1px solid #eff1f9;
    margin-top: 8px;
    font-size: 14px;
    outline: none;

    &_error {
      border-color: #d6073d;

      &:focus {
        border-color: #d6073d;
      }
    }
  }

  &__button {
    position: absolute;
    right: 0;
    width: 202px;
    height: 44px;
    border: 0;
    margin-top: 29px;
    background: #d6073d;
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
    outline: none;
    text-decoration: none;

    &:hover {
      background: darken(#d6073d, 12.5%);
    }

    @media (max-width: 768px) {
      width: 100%;
    }
  }
}
</style>
