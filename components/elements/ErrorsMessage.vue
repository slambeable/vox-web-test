<template>
  <div
    :class="
      [
        'error-message',
        className.length !== 0 ? `${className}__error-message` : ''
      ]"
  >
    <small
      :style="{ top }"
      :class="
        [
          'error-message__text',
          `error-message__text_${error.className}`
        ]"
    >
      {{ error.text }}
    </small>
  </div>
</template>

<script>
export default {
  props: {
    errors: {
      default: () => [],
      type: Array
    },
    className: {
      default: '',
      type: String
    },
    top: {
      default: '0',
      type: String
    }
  },
  computed: {
    error () {
      return this.errors.reduce((acc, value) => {
        if (value.condition && this._.isEmpty(acc)) {
          return value
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/style/colors';

.error-message {
  position: relative;
  width: 100%;
  margin-bottom: 15px;

  &__text {
    position: absolute;
    display: block;
    width: 100%;
    color: $main-theme;
    font-size: 12px;
    font-weight: 400;
    line-height: 12px;
    text-align: left;
  }
}
</style>
