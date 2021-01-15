<template>
  <form
    class="profile-settings"
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
</template>

<style lang='scss'>
.profile-settings {
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
