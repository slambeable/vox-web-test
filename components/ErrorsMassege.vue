<template>
  <div
    :class="
      [
        'errors-massege',
        className.length !== 0 ? className : ''
      ]"
  >
    <small
      :class="
        [
          'errors-massege__text',
          `errors-massege__text_${filterErrors.className}`
        ]"
    >
      {{ filterErrors.text }}
    </small>
  </div>
</template>

<script>
export default {
  name: 'ErrorMassege',
  props: {
    errors: {
      default: () => [],
      type: Array
    },
    className: {
      default: '',
      type: String
    }
  },
  computed: {
    filterErrors () {
      return this.errors.reduce((acc, value) => {
        if (Object.keys(acc).length === 0) {
          console.log(value)
          return value.condition ? value : {}
        }
      }, {})
    }
  },
  watch: {
    errors () {
      console.log('sasay')
    }
  }
}
</script>

<style lang="scss">
  .errors-massege {
    position: relative;
    width: 100%;
    margin-bottom: 15px;

    &__text {
      position: absolute;
      display: block;
      width: 100%;
      margin-bottom: 5px;
      color: #d6073d;
      font-size: smaller;
      text-align: left;
    }
  }
</style>
