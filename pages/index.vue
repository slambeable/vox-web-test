<template>
  <form
    class="users-form"
    @submit.prevent="submitHandler"
  >
    <img
      class="users-form__logo"
      src="@/assets/images/logo.svg"
      alt="logo"
    >
    <input
      v-model.trim="form.login"
      :class="[
        'users-form__login',
        $v.form.login.$error || correctAuthenticationError ? 'users-form__login_error' : ''
      ]"
      type="text"
      placeholder="Логин"
    >
    <errors-message
      :top="'-8px'"
      :class-name="'users-form'"
      :errors="dataLoginErrors"
    />
    <input
      v-model.trim="form.password"
      :class="[
        'users-form__password',
        $v.form.password.$error || correctAuthenticationError ? 'users-form__password_error' : ''
      ]"
      type="password"
      placeholder="Пароль"
    >
    <errors-message
      :top="'-8px'"
      :class-name="'users-form'"
      :errors="dataPasswordErrors"
    />
    <div class="error-message users-form-errors">
      <small
        v-if="correctAuthenticationError"
        class="error-message__text users-form-errors__authentification"
      >
        Введен неверный логин или пароль
      </small>
    </div>
    <submit-button
      :text="submitButtonText"
      :class-name="'users-form'"
      :width="'358px'"
    />
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
  required,
  maxLength,
  minLength
} from 'vuelidate/lib/validators'
import {
  containsUppercase,
  containsLowercase,
  containsNumber,
  containsSpecial,
  containsOnlyLatinLetters,
  containsOnlyPassword
} from '@/assets/utils/customVuelidate'
import data from '@/mixins/data/vuelidate'
import ErrorsMessage from '@/components/elements/ErrorsMessage'
import SubmitButton from '@/components/elements/SubmitButton'

export default {
  components: {
    ErrorsMessage,
    SubmitButton
  },
  mixins: [
    validationMixin,
    data
  ],
  data () {
    return {
      form: {
        login: '',
        password: ''
      },
      correctAuthenticationError: false,
      isRegistered: false
    }
  },
  computed: {
    submitButtonText () {
      return this.isRegistered ? 'Войти' : 'Зарегестрироваться'
    }
  },
  created () {
    if (this.$store.getters['user/isRegistered']) {
      this.isRegistered = true
    }
  },
  methods: {
    submitHandler () {
      if (!this.isRegistered) {
        this.$v.form.login.$touch()
        this.$v.form.password.$touch()
        if (!this.$v.$error) {
          this.$store.commit('user/setLogin', this.form.login)
          this.$store.commit('user/setPassword', this.form.password)
          this.$store.commit('user/register')
          this.isRegistered = true
          this.form.login = ''
          this.form.password = ''
          this.$v.$reset()
        }
      } else {
        const login = this.$store.getters['user/login']
        const password = this.$store.getters['user/password']

        if (this.form.login === login && this.form.password === password) {
          this.correctAuthenticationError = false
          this.$store.commit('user/authorize')
          this.$router.push('/user')
        } else {
          this.correctAuthenticationError = true
        }
      }
    }
  },
  validations () {
    return {
      form: {
        login: {
          required,
          containsOnlyLatinLetters,
          minLength: minLength(3),
          maxLength: maxLength(20)
        },
        password: {
          required,
          containsOnlyPassword,
          minLength: minLength(8),
          maxLength: maxLength(25),
          containsLowercase,
          containsUppercase,
          containsNumber,
          containsSpecial
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import '../assets/style/mixins';

@include errors-message();

.users-form {
  position: absolute;
  top: 139px;
  left: 50%;
  display: flex;
  width: 358px;
  height: 350px;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  text-align: center;
  transform: translate(-50%);

  &__logo {
    width: 158px;
    height: 40px;
    margin-bottom: 61px;
  }

  &__login,
  &__password {
    width: 358px;
    height: 44px;
    padding-left: 20px;
    border: 1px solid $secondary-color;
    margin-bottom: 16px;
    background: $panel;
    border-radius: 10px;
    font-weight: 400;
    outline: none;

    &_error {
      border-color: $main-theme;
    }
  }

  @media (max-width: 768px) {
    &,
    &__login,
    &__password,
    &__button {
      width: 296px;
    }
  }
}
</style>
