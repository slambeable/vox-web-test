<template>
  <form
    class="profile-setings"
    @submit.prevent="submitHandler"
  >
    <div class="profile-setings-column">
      <label class="profile-setings__label">
        Имя
        <input
          v-model.trim="form.firstName"
          :class="[
            'profile-setings__input',
            $v.form.firstName.$error ? 'profile-setings__input_error' : ''
          ]"
          type="text"
        >
      </label>
      <errors-message
        :class-name="'profile-setings-column-errors'"
        :errors="dataFirstNameErrors"
        top="8px"
      />
      <label class="profile-setings__label">
        Фамилия
        <input
          v-model.trim="form.lastName"
          :class="[
            'profile-setings__input',
            $v.form.lastName.$error ? 'profile-setings__input_error' : ''
          ]"
          type="text"
        >
      </label>
      <errors-message
        :class-name="'profile-setings-column-errors'"
        :errors="dataLastNameErrors"
        top="8px"
      />
    </div>
    <div class="profile-setings-column">
      <label class="profile-setings__label">
        Сменить пароль
        <input
          v-model.trim="form.password"
          :class="[
            'profile-setings__input',
            $v.form.password.$error ? 'profile-setings__input_error' : ''
          ]"
          type="password"
        >
      </label>
      <errors-message
        :class-name="'profile-setings-column-errors'"
        :errors="dataPasswordErrors"
        top="8px"
      />
      <label class="profile-setings__label">
        Сменить логин
        <input
          v-model.trim="form.login"
          :class="[
            'profile-setings__input',
            $v.form.login.$error ? 'profile-setings__input_error' : ''
          ]"
          type="text"
        >
      </label>
      <errors-message
        :class-name="'profile-setings-column'"
        :errors="dataLoginErrors"
        :top="'8px'"
      />
      <submit-button
        :text="submitButtonText"
        :class-name="'profile-setings'"
        :width="'202px'"
        :float="'right'"
        :margin-top="'29px'"
      />
    </div>
  </form>
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
        firstName: '',
        lastName: '',
        login: '',
        password: ''
      },
      submitButtonText: 'Сохранить'
    }
  },
  watch: {
    'form.firstName' () {
      this.form.firstName = this._.capitalize(this.form.firstName)
    },
    'form.lastName' () {
      this.form.lastName = this._.capitalize(this.form.lastName)
    }
  },
  created () {
    this.$v.form.firstName.$touch()
    this.$v.form.lastName.$touch()

    this.form.firstName = this.$store.getters['user/firstName'] ?? ''
    this.form.lastName = this.$store.getters['user/lastName'] ?? ''
  },
  methods: {
    submitHandler () {
      if (this.form.login !== '') {
        this.$v.form.login.$touch()

        if (!this.$v.form.login.$error) {
          this.$store.commit('user/setLogin', this.form.login)
        }
      }

      if (this.form.password !== '') {
        this.$v.form.password.$touch()

        if (!this.$v.form.password.$error) {
          this.$store.commit('user/setPassword', this.form.password)
        }
      }

      if (!this.$v.form.firstName.$error) {
        this.$store.commit('user/setFirstName', this.form.firstName)
      }

      if (!this.$v.form.lastName.$error) {
        this.$store.commit('user/setLastName', this.form.lastName)
      }
    }
  },
  validations () {
    return {
      form: {
        firstName: {
          required,
          containsOnlyLatinOrCyrillicLetters
        },
        lastName: {
          required,
          containsOnlyLatinOrCyrillicLetters
        },
        login: {
          containsOnlyLatinLetters,
          minLength: minLength(3),
          maxLength: maxLength(20)
        },
        password: {
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

<style lang='scss'>
@import '../assets/style/colors';

.profile-setings {
  display: flex;
  min-height: 252px;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 24px;
  background: $panel;
  border-radius: 10px;

  &-column {
    position: relative;

    &:nth-child(2) {
      margin-bottom: 90px;
    }
  }

  &__label {
    display: block;
    margin-top: 34px;
    color: $exit;
    font-size: 14px;
    font-weight: 400;

    @media (max-width: 768px) {
      width: 296px;
    }
  }

  &:focus {
    border-color: $exit;
  }

  &__input {
    display: block;
    width: 360px;
    border: 0;
    border-bottom: 1px solid $line;
    margin-top: 8px;
    font-size: 14px;
    outline: none;

    &_error {
      border-color: $main-theme;

      &:focus {
        border-color: $main-theme;
      }
    }

    @media (max-width: 768px) {
      width: 100%;
    }
  }
}
</style>
