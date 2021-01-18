<template>
  <div>
    <h1 class="title">
      Список задач
    </h1>
    <div class="chart">
      <line-chart
        :chart-data="dataCollection"
        :options="options"
      />
      <chart-controller
        :class-name="'statistics'"
        :update="update"
        :data="dataCollection"
        :proprieties="datasetProprieties"
        :create="create"
        :month="month"
      />
    </div>
  </div>
</template>

<script>
import LineChart from '@/components/LineChart'
import sizeDeviceDetecter from '@/mixins/sizeDeviceDetecter'
import customChart from '@/mixins/data/customChart'
import ChartController from '@/components/elements/ChartController'
import random from '@/mixins/getRandom'

export default {
  components: {
    LineChart,
    ChartController
  },
  mixins: [
    sizeDeviceDetecter,
    customChart,
    random
  ],
  data () {
    return {
      action: false,
      isMobile: null,
      dataCollection: {},
      options: null,
      month: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Ноябрь',
        'Декабрь'
      ],
      datasetProprieties: [
        {
          text: 'Первая дата',
          color: '#eeb969'
        },
        {
          text: 'Вторая дата',
          color: '#788dff'
        },
        {
          text: 'Третья дата',
          color: '#cd5c5c'
        },
        {
          text: 'Четвертая дата',
          color: '#40e0d0'
        },
        {
          text: 'Пятая дата',
          color: '#808000'
        }
      ],
      monthCounter: 4,
      lineCounter: 2
    }
  },
  created () {
    this.handleDeviseSize()
    this.fillChartDataAndOptions(this.getRandomWithNegative)
  },
  methods: {
    update () {
      return this.$children[0].$data._chart.update()
    },
    create ({ text, color }, count) {
      return this.createDataset({ text, color }, count)
    }
  },
  layout: 'main',
  middleware: 'checkAuth'
}
</script>

<style lang="scss">
@import '~assets/style/mixins';

@include title();

.chart {
  position: relative;
  min-height: 359px;
  padding: 41px 40px 37px 36px;
  margin-top: 24px;
  background: $panel;
  border-radius: 10px;

  @media (max-width: 768px) {
    padding: 15px;
  }
}

.chart > div:nth-child(1) {
  width: 99% !important;
  height: 90% !important;
  margin: 0 auto;
  cursor: pointer;
}
</style>
