<script>
import GlobalVariables from "@/GlobalVariableHolder";
import PlotlyChart from "@/components/PlotlyChart.vue";

export default {
  name: "JTLBigChart",
  components: {PlotlyChart},
  computed: {
    normaltransactions: function () {
      return [...new Set(GlobalVariables.variables.$jtldata.map(item => item.label).filter((data) => !data.startsWith('#')))];
    },
    responsetimes: function () {

      var config = {responsive: true}

      var data = []

      var reduceddata = this.$d3.rollup (GlobalVariables.variables.$jtldata.filter ((item) => {
            if (this.normaltransactions.includes(item.label)) return item
          }),
          (v,e) => {
            return {
              avg: this.$d3.mean (v,
                  e => e.elapsed),
              max: this.$d3.max (v,
                  e => e.elapsed),
              min: this.$d3.min (v,
                  e => e.elapsed),
              pct90: this.$d3.quantile (v,
                  0.90,
                  e => e.elapsed),
              pct95: this.$d3.quantile (v,
                  0.95,
                  e => e.elapsed),
              pct99: this.$d3.quantile (v,
                  0.99,
                  e => e.elapsed),
              count: this.$d3.count (v,
                  e => e.elapsed),
            }
          },
           d => d.label, d => parseInt (d.timeStamp / 10000))

      console.log('Rollup map:')
      console.log(reduceddata)

      this.normaltransactions.forEach(function (label) {
        console.log('Adding label ' + label)

        var x = Array.from (reduceddata.get(label).keys ())
            .map ((item) => {
              return item * 10000
            })

        var y = Array.from (reduceddata.get(label).values ())
            .map ((item) => {
              return item["avg"] / 1000
            })

        var transactiondetails = {
          type: 'line',
          name: label,
          x: x,
          y: y,
          mode: 'markers',
          hoverlabel: {
            namelength: -1,
            align: 'auto'
          },
          visible: 'yes', // (['avg','min','max'].includes (label) ? 'yes' : 'legendonly'),
          marker: {
            // color: '#456E88',
            symbol: (['max','pct90','pct95','pct99'].includes (label) ? 'triangle-up-open' : (['min'].includes (label) ? 'triangle-down-open' : 'open')),

          }
        }

        data.push (transactiondetails)

      })

      var layout = {
        title: '', // this.transaction,
        autosize: true,
        height: window.innerHeight * 0.5,
        hovermode: 'closest',
        margin: {
          l: 50,
          r: 10,
          t: 50,
          b: 50,
          pad: 10,
          autoexpand: true
        },
        xaxis: {
          //tickformat: '1',
          title: 'Time',
          type: 'date',
          zeroline: true,
          nticks: 20
        },
        yaxis: {
          tickformat: '',
          tick0: '0.0',
          title: 'seconds',
          rangemode: 'tozero'
        },
        legend: {
          orientation: 'v',
          traceorder: 'normal'
        }
      }

      var retourobject = {
        data: data,
        layout: layout,
        config: config
      }

      console.log ("retourobject: ")
      console.log (retourobject)
      return retourobject

    },
    tps: function() {
      var config = {responsive: true}

      var data = []

      var reduceddata = this.$d3.rollup (GlobalVariables.variables.$jtldata.filter ((item) => {
            if (this.normaltransactions.includes(item.label)) return item
        }),
        (v,e) => {
          return {
            tps: this.$d3.count (v,
                e => e.elapsed),
          }
        }, d => parseInt (d.timeStamp / 10000))


      var x = Array.from (reduceddata.keys ())
          .map ((item) => {
            return item * 10000
          })

      var y = Array.from (reduceddata.values ())
          .map ((item) => {
            return item["tps"] / 10
          })

      var transactiondetails = {
        type: 'line',
        name: 'TPS',
        x: x,
        y: y,
        mode: 'lines',
        hoverlabel: {
          namelength: -1,
          align: 'auto'
        },
        visible: 'yes',
        marker: {
          symbol: 'open',
        }
      }

      data.push (transactiondetails)

      var layout = {
        title: 'TPS of all transactions',
        autosize: true,
        height: window.innerHeight * 0.3,
        hovermode: 'closest',
        margin: {
          l: 50,
          r: 10,
          t: 50,
          b: 50,
          pad: 10,
          autoexpand: true
        },
        xaxis: {
          //tickformat: '1',
          title: 'Time',
          type: 'date',
          zeroline: true,
          nticks: 20
        },
        yaxis: {
          tickformat: '',
          tick0: '0.0',
          title: 'transactions per second',
          rangemode: 'tozero'
        },
        showlegend: true,
        legend: {
          orientation: 'v',
          traceorder: 'normal',
        }
      }

      var retourobject = {
        data: data,
        layout: layout,
        config: config
      }

      console.log ("retourobject: ")
      console.log (retourobject)
      return retourobject

    }
  },
  async mounted() {

  }
}

</script>

<template>
  <h1>Overview chart of all transactions</h1>
  <PlotlyChart :chartdetails="responsetimes"></PlotlyChart>
  <PlotlyChart :chartdetails="tps"></PlotlyChart>

</template>

<style scoped>

</style>