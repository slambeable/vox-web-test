<template>
  <button
    :class="
      [
        'submit_button',
        className.length !== 0 ? `${className}__submit_button` : '',
        isTouched ? 'submit_button__touch' : ''
      ]"
    :style="{ width, marginTop, float }"
    @touchstart="isTouched = true"
    @touchend="isTouched = false"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    className: {
      default: '',
      type: String
    },
    text: {
      default: '',
      type: String
    },
    width: {
      default: '0',
      type: String
    },
    marginTop: {
      default: '0',
      type: String
    },
    float: {
      default: 'none',
      type: String
    }
  },
  data () {
    return {
      isTouched: false
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/style/colors';

.submit_button {
  height: 44px;
  border: 0;
  background: $main-theme;
  border-radius: 10px;
  color: $panel;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  text-decoration: none;

  &__touch {
    background: darken($main-theme, 12.5%);
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background: darken($main-theme, 12.5%);
    }
  }

  @media (max-width: 768px) {
    width: 100% !important;
  }
}
</style>
