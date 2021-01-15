<template>
  <div>
    <h1 class="title">
      Список задач
    </h1>
    <div class="charts">
      <line-chart :action="action" :chart-data="datacollection" :height="chartHeight" :options="options" />
    </div>
    <div>
      <button @click="editChart">
        lol1
      </button>
      <button @click="addList">
        lol2
      </button>
      <button @click="removeList">
        lol3
      </button>
      <button @click="addData">
        lol5
      </button>
      <button @click="removeData">
        lol6
      </button>
    </div>
  </div>
</template>

<script>
import LineChart from '@/components/LineChart'
import random from '@/mixins/getRandom'
import sizeDeviceDetecter from '@/mixins/sizeDeviceDetecter'

export default {
  components: {
    LineChart
  },
  mixins: [
    random,
    sizeDeviceDetecter
  ],
  data () {
    return {
      action: false,
      isMobile: null,
      datacollection: null,
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
      datasetProprietes: [
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
      options: {
        legend: {
          labels: {
            fullWidth: true,
            fontColor: '#cbcbcb'
          }
        },
        tooltips: {
          intersect: false,
          mode: 'x',
          xPadding: 11,
          yPadding: 15,
          borderWidth: 25,
          borderColor: '#fff',
          backgroundColor: '#fff',
          bodyFontColor: '#cbcbcb',
          bodySpacing: 3,
          bodyFontSize: 14,
          cornerRadius: 5,
          caretSize: 0,
          callbacks: {
            title () {}
          },
          shadowOffsetX: 0,
          shadowOffsetY: 1,
          shadowColor: 'rgba(0, 0, 0, 0.15)'
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: '#cbcbcb',
              fontSize: 14,
              padding: 10
            },
            gridLines: {
              lineWidth: 2,
              zeroLineWidth: 2,
              drawTicks: false
            }
          }],
          xAxes: [{
            ticks: {
              fontColor: '#cbcbcb',
              fontSize: 14,
              padding: 10
            },
            gridLines: {
              drawTicks: false
            }
          }]
        }
      },
      monthCounter: 4,
      lineCounter: 2
    }
  },
  computed: {
    chartHeight () {
      return this.isMobile ? 400 : 200
    }
  },
  created () {
    this.handleDeviseSize()
    this.fillData()
  },
  methods: {
    fillData () {
      this.datacollection = {
        labels: this.isMobile ? this.month.slice(0, 4) : this.month.slice(0, 6),
        datasets: [...this._.fill(Array(2), null).map((value, index) => {
          return this.createDataset(this.datasetProprietes[index], this.isMobile ? 5 : 7)
        })]
      }
    },
    createDataset ({ text, color }, count) {
      return {
        label: text,
        borderColor: color,
        backgroundColor: color,
        pointBackgroundColor: '#fff',
        pointBorderColor: color,
        pointBorderWidth: 2,
        pointRadius: 4,
        fill: false,
        data: this._.fill(Array(count)).map(() => this.getRandomWithNegative(0, 100))
      }
    },
    editChart (e, update) {
      this.datacollection.datasets.forEach((dataset, i) => {
        dataset.data = dataset.data.map(() => this.getRandomWithNegative(0, 100))
      })

      this.doAction()
    },
    addData (e) {
      if (this.datacollection.labels.length < 11) {
        this.datacollection.datasets.forEach((dataset) => {
          dataset.data = [
            ...dataset.data,
            this.getRandomWithNegative(0, 100)
          ]
        })
        this.datacollection.labels = this.month.slice(0, this.datacollection.labels.length + 1)

        e.target.parentNode.style.pointerEvents = 'none'
        this.doAction()
        e.target.parentNode.style.pointerEvents = 'auto'
      }
    },
    removeData (e) {
      if (this.datacollection.labels.length > 3) {
        this.datacollection.datasets.forEach((dataset) => {
          dataset.data = [
            ...dataset.data.slice(0, dataset.data.length - 1)
          ]
        })
        this.datacollection.labels = this.month.slice(0, this.datacollection.labels.length - 1)

        e.target.parentNode.style.pointerEvents = 'none'
        this.doAction()
        e.target.parentNode.style.pointerEvents = 'auto'
      }
    },
    addList (e) {
      if (this.datacollection.datasets.length < 5) {
        this.datacollection.datasets = [
          ...this.datacollection.datasets,
          this.createDataset(this.datasetProprietes[this.datacollection.datasets.length],
            this.datacollection.datasets[0].data.length)
        ]

        e.target.parentNode.style.pointerEvents = 'none'
        this.doAction()
        e.target.parentNode.style.pointerEvents = 'auto'
      }
    },
    removeList (e) {
      if (this.datacollection.datasets.length > 1) {
        this.datacollection.datasets = [
          ...this.datacollection.datasets.slice(0, this.datacollection.datasets.length - 1)
        ]

        e.target.parentNode.style.pointerEvents = 'none'
        this.doAction()
        e.target.parentNode.style.pointerEvents = 'auto'
      }
    },
    doAction () {
      this.action = false
      this.action = true
    }
  },
  layout: 'main',
  middleware: 'checkAuth'
}
</script>

<style lang="scss">
@import '../../assets/style/mixins';

@include title();

.charts {
  position: relative;
  height: 584px;
  min-height: 359px;
  padding: 41px 40px 37px 36px;
  margin-top: 24px;
  background: #fff;
  border-radius: 10px;

  @media (max-width: 768px) {
    padding: 15px;
  }
}

#line-chart {
  cursor: pointer;
}
</style>
