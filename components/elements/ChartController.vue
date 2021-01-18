<template>
  <div
    :class="
      [
        'chart-controller',
        className.length !== 0 ? `${className}__chart-controller` : '',
      ]"
  >
    <button
      v-for="(button, index) in buttons"
      :key="index"
      :class="[
        'chart-controller__button',
        button.isTouched ? 'chart-controller__button__touch' : ''
      ]"
      @click="button.handler"
      @touchstart="button.isTouched = true"
      @touchend="button.isTouched = false"
    >
      {{ button.text }}
    </button>
  </div>
</template>

<script>
import random from '@/mixins/getRandom'
import sizeDeviceDetecter from '@/mixins/sizeDeviceDetecter'

export default {
  mixins: [
    random,
    sizeDeviceDetecter
  ],
  props: {
    className: {
      default: '',
      type: String
    },
    update: {
      default: () => {},
      type: Function
    },
    create: {
      default: () => {},
      type: Function
    },
    data: {
      default: () => {},
      type: Object
    },
    proprieties: {
      default: () => [],
      type: Array
    },
    month: {
      default: () => [],
      type: Array
    }
  },
  data () {
    return {
      isMobile: null,
      buttons: [
        {
          text: 'Случайные данные',
          handler: this.editChart,
          isTouched: false
        },
        {
          text: 'Добавить данные',
          handler: this.addData,
          isTouched: false
        },
        {
          text: 'Удалить данные',
          handler: this.removeData,
          isTouched: false
        },
        {
          text: 'Увеличить кол-во данных',
          handler: this.addList,
          isTouched: false
        },
        {
          text: 'Уменьшить кол-во данных',
          handler: this.removeList,
          isTouched: false
        }
      ]
    }
  },
  created () {
    this.handleDeviseSize()
  },
  methods: {
    editChart () {
      this.data.datasets.forEach((dataset, i) => {
        dataset.data = dataset.data.map(() => this.getRandomWithNegative(0, 100))
      })

      this.update()
    },
    addData () {
      if (this.data.labels.length < 11) {
        this.data.datasets.forEach((dataset) => {
          dataset.data = [
            ...dataset.data,
            this.getRandomWithNegative(0, 100)
          ]
        })
        if (!this.isMobile || (this.isMobile && this.data.labels.length < 6)) {
          this.data.labels = this.month.slice(0, this.data.labels.length + 1)
        }

        this.update()
      }
    },
    removeData () {
      if (this.data.labels.length > 3) {
        this.data.datasets.forEach((dataset) => {
          dataset.data = [
            ...dataset.data.slice(0, dataset.data.length - 1)
          ]
        })
        this.data.labels = this.month.slice(0, this.data.labels.length - 1)

        this.update()
      }
    },
    addList () {
      if (this.data.datasets.length < 5) {
        this.data.datasets = [
          ...this.data.datasets,
          this.create(this.proprieties[this.data.datasets.length],
            this.data.datasets[0].data.length)
        ]

        this.update()
      }
    },
    removeList () {
      if (this.data.datasets.length > 1) {
        this.data.datasets = [
          ...this.data.datasets.slice(0, this.data.datasets.length - 1)
        ]

        this.update()
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/style/colors';

.chart-controller {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  &__button {
    height: 32px;
    border: 1px solid $secondary-color;
    margin: 5px 0;
    background-color: transparent;
    border-radius: 10px;
    color: $secondary-color;
    cursor: pointer;
    font-size: 12px;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    text-decoration: none;

    &__touch {
      border-color: $main-theme;
      color: $main-theme;
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        border-color: $main-theme;
        color: $main-theme;
      }
    }
  }
}
</style>
