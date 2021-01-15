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
      v-model="login"
      :class="[
        'users-form__login',
        $v.login.$error ? 'users-form__login_error' : ''
      ]"
      type="text"
      placeholder="Логин"
    >
    <errors-massege
      :class-name="'users-form-errors'"
      :errors="dataLoginErrors"
    />
    <input
      v-model="password"
      :class="[
        'users-form__password',
        $v.password.$error ? 'users-form__password_error' : ''
      ]"
      type="password"
      placeholder="Пароль"
    >
    <div class="users-form-errors">
      <small
        v-if="$v.password.$dirty && !$v.password.required"
        class="users-form-errors__password"
      >
        Введите пожалуйста пароль
      </small>
      <small
        v-else-if="$v.password.$dirty && !$v.password.containsOnlyPassword"
        class="users-form-errors__password"
      >
        Пароль может содержать только латинские буквы, цифры и специальные символы
      </small>
      <small
        v-else-if="$v.password.$dirty && (!$v.password.minLength || !$v.password.maxLength)"
        class="users-form-errors__password"
      >
        Пароль должен быть не менее 8 и не более 25 символов
      </small>
      <small
        v-else-if="$v.password.$dirty &&
          (
            !$v.password.containsLowercase
            || !$v.password.containsUppercase
            || !$v.password.containsNumber
            || !$v.password.containsSpecial
          )"
        class="users-form-errors__password"
      >
        Пароль должен содержать хотя бы одну прописную и одну строчную букву, а также цифру и специальный символ
      </small>
    </div>
    <div class="users-form-errors">
      <small
        v-if="correctAuthenticationError"
        class="users-form-errors__authentification"
      >
        Введен неверный логин или пароль
      </small>
    </div>
    <button
      class="users-form__button"
    >
      {{ isRegistered ? 'Войти' : 'Зарегестрироваться' }}
    </button>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
  required, maxLength, minLength
} from 'vuelidate/lib/validators'
import {
  containsUppercase, containsLowercase, containsNumber, containsSpecial, containsOnlyLatinLetters, containsOnlyPassword
} from '@/assets/utils/customVuelidate'
import ErrorsMassege from '@/components/ErrorsMassege'

export default {
  components: {
    ErrorsMassege
  },
  mixins: [validationMixin],
  data () {
    return {
      login: '',
      password: '',
      correctAuthenticationError: false,
      isRegistered: false,
      dataLoginErrors: null
    }
  },
  created () {
    if (this.$store.getters['user/isRegistered']) {
      this.isRegistered = true
    }

    this.fillData()
  },
  methods: {
    submitHandler () {
      if (!this.isRegistered) {
        this.$v.login.$touch()
        this.$v.password.$touch()
        if (!this.$v.$error) {
          this.$store.commit('user/setLogin', this.login)
          this.$store.commit('user/setPassword', this.password)
          this.$store.commit('user/register')
          this.isRegistered = true
          this.login = ''
          this.password = ''
          this.$v.$reset()
        }
      } else {
        const login = this.$store.getters['user/login']
        const password = this.$store.getters['user/password']

        if (this.login === login && this.password === password) {
          this.correctAuthenticationError = false
          this.$store.commit('user/authorize')
          this.$router.push('/user')
        } else {
          this.correctAuthenticationError = true
        }
      }
    },
    fillData () {
      this.dataLoginErrors = [
        {
          className: 'requaired',
          text: 'Введите пожалуйста логин',
          condition: this.$v.login.$dirty && !this.$v.login.required
        },
        {
          className: 'contains-only-latin-letters',
          text: 'Логин может содержать только буквы латинского алфавита',
          condition: this.$v.login.$dirty && !this.$v.login.containsOnlyLatinLetters
        },
        {
          className: 'length',
          text: 'Логин должен содержать не менее 3 и не более 20 символов',
          condition: this.$v.login.$dirty && (!this.$v.login.minLength || !this.$v.login.maxLength)
        }
      ]
    }
  },
  validations () {
    return {
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
</script>

<style lang="scss">
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
    border: 1px solid #cbcbcb;
    margin-bottom: 16px;
    background: #fff;
    border-radius: 10px;
    outline: none;

    &_error {
      border-color: #d6073d;
    }
  }

  &-errors {
    position: relative;
    width: 100%;
    margin-bottom: 15px;

    &__login,
    &__password,
    &__authentification {
      position: absolute;
      display: block;
      width: 100%;
      margin-bottom: 5px;
      color: #d6073d;
      font-size: smaller;
      text-align: left;
    }
  }

  &__button {
    width: 358px;
    height: 44px;
    border: 0;
    background: #d6073d;
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
    outline: none;
    text-decoration: none;

    &:hover {
      background: darken(#d6073d, 12.5%);
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
