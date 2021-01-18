export default {
  methods: {
    fillChartDataAndOptions (random) {
      this.random = random
      this.dataCollection = {
        labels: this.isMobile ? this.month.slice(0, 4) : this.month.slice(0, 6),
        datasets: [...this._.fill(Array(2), null).map((value, index) => {
          return this.createDataset(this.datasetProprieties[index], this.isMobile ? 5 : 7)
        })]
      }
      this.options = {
        maintainAspectRatio: false,
        legend: {
          labels: {
            fullWidth: true,
            fontColor: '#cbcbcb',
            fontSize: 14,
            fontWeight: 500,
            fontFamily: 'Montserrat'
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontSize: 14,
              fontColor: '#cbcbcb',
              fontWeight: 500,
              fontFamily: 'Montserrat'
            }
          }],
          xAxes: [{
            ticks: {
              fontSize: 14,
              fontColor: '#cbcbcb',
              fontWeight: 500,
              fontFamily: 'Montserrat'
            }
          }]
        },

        tooltips: {
          enabled: false,
          intersect: false,
          mode: 'x',
          bodyFontSize: 14,
          custom (tooltipModel) {
            // Tooltip Element
            let tooltipElement = document.querySelector('.chartjs-tooltip')

            // Create element on first render
            if (!tooltipElement) {
              const newTooltipElement = '<div class="chartjs-tooltip"><div></div></div>'

              document.body.insertAdjacentHTML('beforeend', newTooltipElement)
              tooltipElement = document.querySelector('.chartjs-tooltip')
            }

            // Mine style
            tooltipElement.style.minWidth = '220px'
            tooltipElement.style.backgroundColor = '#fff'
            tooltipElement.style.borderRadius = '5px 5px 0px 5px'
            tooltipElement.style.boxShadow = '0px 1px 4px rgba(0, 0, 0, 0.15)'
            tooltipElement.style.color = '#cbcbcb'

            // Hide if no tooltip
            if (tooltipModel.opacity === 0) {
              tooltipElement.style.opacity = 0
              return
            }

            const getBody = (bodyItem) => {
              return bodyItem.lines
            }

            // Set Text
            if (tooltipModel.body) {
              const bodyLines = tooltipModel.body.map(getBody)
              let textElement = ''

              bodyLines.forEach(function (body, i) {
                const bodyWithoutDoubleQuotes = body[0].replace(':', '')
                const text = `<span>${bodyWithoutDoubleQuotes.slice(0, bodyWithoutDoubleQuotes.length - 2).replace('-', '').trim()}</span>`

                const number = bodyWithoutDoubleQuotes.slice(-2)
                const dash = bodyWithoutDoubleQuotes.includes('-') ? '-' : ''
                const numberStyle = 'style="color: #303136; float: right; font-weight: 400; font-size: 12px; margin-top: 2px"'

                const labelColor = tooltipModel.labelColors[i].borderColor
                const labelColorStyle = `style="background-color: ${labelColor}; margin-right: 8px; width: 36px; height: 12px; display: inline-block"`
                const labelColorElement = `<div ${labelColorStyle}></div>`

                const customNumber = `<span ${numberStyle}>${dash}${number.replace(/-/g, '')}</span>`

                textElement += `<div>${labelColorElement}${text}${customNumber}</div>`
              })
              const textElementStyle = 'style="margin-top: 4px"'
              const innerHtml = `<div ${textElementStyle}>${textElement}</div>`

              const tableRoot = tooltipElement.querySelector('div')
              tableRoot.innerHTML = innerHtml
            }

            // `this` will be the overall tooltip
            const position = this._chart.canvas.getBoundingClientRect()
            // const lol = document.querySelector('canvas')

            if (tooltipModel.caretX + tooltipElement.offsetWidth > position.right) {
              tooltipElement.style.right = position.right - tooltipElement.offsetWidth
            } else {
              tooltipElement.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px'
            }

            // Display, position, and set styles for font
            tooltipElement.style.opacity = 1
            tooltipElement.style.position = 'absolute'
            tooltipElement.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px'
            tooltipElement.style.fontFamily = 'Montserrat'
            tooltipElement.style.fontSize = '14px'
            tooltipElement.style.fontWeight = '500'
            tooltipElement.style.fontStyle = tooltipModel._bodyFontStyle
            tooltipElement.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px'
            tooltipElement.style.pointerEvents = 'none'
          }
        }
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
        data: this._.fill(Array(count)).map(() => this.random(0, 100))
      }
    }
  }
}
