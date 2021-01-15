<script>
import 'chartjs-plugin-style'
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    options: {
      default: null,
      type: Object
    },
    action: {
      default: false,
      type: Boolean
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  },
  watch: {
    action () {
      if (this.action) {
        this.$data._chart.update()
      }
    }
  }
}
</script>
