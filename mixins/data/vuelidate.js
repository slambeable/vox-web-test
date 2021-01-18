export default {
  computed: {
    dataLoginErrors () {
      return [
        {
          className: 'requaired',
          text: 'Введите пожалуйста логин',
          condition: this.$v.form.login.$params.required
            ? this.$v.form.login.$dirty && !this.$v.form.login.required
            : false
        },
        {
          className: 'contains-only-latin-letters',
          text: 'Логин может содержать только буквы латинского алфавита',
          condition: this.$v.form.login.$dirty && !this.$v.form.login.containsOnlyLatinLetters
        },
        {
          className: 'length',
          text: 'Логин должен содержать не менее 3 символов',
          condition: this.$v.form.login.$dirty && !this.$v.form.login.minLength
        },
        {
          className: 'length',
          text: 'Логин должен содержать не более 20 символов',
          condition: this.$v.form.login.$dirty && !this.$v.form.login.maxLength
        }
      ]
    },
    dataPasswordErrors () {
      return [
        {
          className: 'requaired',
          text: 'Введите пожалуйста пароль',
          condition: this.$v.form.password.$params.required
            ? this.$v.form.password.$dirty && !this.$v.form.password.required
            : false
        },
        {
          className: 'contains-only-password',
          text: 'Пароль может содержать только латинские буквы, цифры и специальные символы',
          condition: this.$v.form.password.$dirty && !this.$v.form.password.containsOnlyPassword
        },
        {
          className: 'length',
          text: 'Пароль должен содержать не менее 8 символов',
          condition: this.$v.form.password.$dirty && !this.$v.form.password.minLength
        },
        {
          className: 'length',
          text: 'Пароль должен содержать не более 25 символов',
          condition: this.$v.form.password.$dirty && !this.$v.form.password.maxLength
        },
        {
          className: 'contains-lowercase',
          text: 'Пароль должен содержать хотя бы одну строчную букву',
          condition: this.$v.form.password.$dirty && !this.$v.form.password.containsLowercase
        },
        {
          className: 'contains-uppercase',
          text: 'Пароль должен содержать хотя бы одну прописную букву',
          condition: this.$v.form.password.$dirty && !this.$v.form.password.containsUppercase
        },
        {
          className: 'contains-number',
          text: 'Пароль должен содержать хотя бы одну цифру',
          condition: this.$v.form.password.$dirty && !this.$v.form.password.containsNumber
        },
        {
          className: 'contains-special',
          text: 'Пароль должен содержать хотя бы один специальный символ',
          condition: this.$v.form.password.$dirty && !this.$v.form.password.containsSpecial
        }
      ]
    },
    dataFirstNameErrors () {
      return [
        {
          className: 'requaired',
          text: 'Пожалуйста заполните поле',
          condition: this.$v.form.firstName.$dirty && !this.$v.form.firstName.required
        },
        {
          className: 'contains-only-latin-or-cyrillic-letters',
          text: 'Имя должно содержать латинские буквы или кириллицу',
          condition: this.$v.form.firstName.$dirty && !this.$v.form.firstName.containsOnlyLatinOrCyrillicLetters
        }
      ]
    },
    dataLastNameErrors () {
      return [
        {
          className: 'requaired',
          text: 'Пожалуйста заполните поле',
          condition: this.$v.form.lastName.$dirty && !this.$v.form.lastName.required
        },
        {
          className: 'contains-only-latin-or-cyrillic-letters',
          text: 'Фамилия должна содержать латинские буквы или кириллицу',
          condition: this.$v.form.lastName.$dirty && !this.$v.form.lastName.containsOnlyLatinOrCyrillicLetters
        }]
    }
  }
}
