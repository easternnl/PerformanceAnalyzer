<script>
import GlobalVariables from "@/GlobalVariableHolder";
import {all} from "axios";
import PlotlyChart from "@/components/PlotlyChart.vue";

export default {
  name: "JTLTransaction",
  components: {PlotlyChart},
  computed: {
    transaction: function () {
      return this.$route.params.transaction
    },
    responsetimes: function() {

      var config = {responsive: true}

      var data = []

      var reduceddata = this.$d3.rollup(GlobalVariables.variables.$jtldata.filter((item) => {
        if (item["label"] == this.transaction) return item
      }), (d, e) => {
        return {
          avg: this.$d3.mean(d, e => e.elapsed),
          max: this.$d3.max(d, e => e.elapsed),
          min: this.$d3.min(d, e => e.elapsed),
          pct90: this.$d3.quantile(d, 0.90, e => e.elapsed),
          pct95: this.$d3.quantile(d, 0.95, e => e.elapsed),
          pct99: this.$d3.quantile(d, 0.99, e => e.elapsed),
          count: this.$d3.count(d, e => e.elapsed),
        } } , d => parseInt(d.timeStamp / 10000))

      var labels = ["avg", "max", "min", "pct90", "pct95", "pct99"]

      var x = Array.from(reduceddata.keys()).map((item) => { return item * 10000})

      labels.forEach(function(label) {
        // console.log(label)

        var y = Array.from(reduceddata.values()).map((item) => { return item[label] / 1000})

        var transactiondetails = {
          type: 'line',
          name: label,
          x: x,
          y: y,
          mode: 'markers',
          hoverlabel:
              {
                namelength: -1,
                align: 'auto'
              },
          visible: (['avg', 'min', 'max'].includes(label)  ? 'yes' : 'legendonly'),
          marker: {
            // color: '#456E88',
            symbol	:	(['max', 'pct90', 'pct95','pct99'].includes(label)  ? 'triangle-up-open' :
                (['min'].includes(label) ? 'triangle-down-open' : 'open')),

          }
        }

        data.push(transactiondetails)

      })

      var layout = {
        title: this.transaction,
        autosize: true,
        height: window.innerHeight * 0.7,
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

      console.log("retourobject: ")
      console.log(retourobject)
      return retourobject

    }

  },
  watch: {
    transaction: function() {
      // console.log('Calling refresh')
      this.drawChart()
    }
  },
  methods: {
    drawChart: function() {
      // console.log(this.transaction)
      // console.log(this)

      var config = {responsive: true}

      var alltransactions = []

      var reduceddata = this.$d3.rollup(GlobalVariables.variables.$jtldata.filter((item) => {
        if (item["label"] == this.transaction) return item
      }), (d, e) => {
        return {
          avg: this.$d3.mean(d, e => e.elapsed),
          max: this.$d3.max(d, e => e.elapsed),
          min: this.$d3.min(d, e => e.elapsed),
          pct90: this.$d3.quantile(d, 0.90, e => e.elapsed),
          pct95: this.$d3.quantile(d, 0.95, e => e.elapsed),
          pct99: this.$d3.quantile(d, 0.99, e => e.elapsed),
          count: this.$d3.count(d, e => e.elapsed),
        } } , d => parseInt(d.timeStamp / 10000))

      var labels = ["avg", "max", "min", "pct90", "pct95", "pct99"]

      var x = Array.from(reduceddata.keys()).map((item) => { return item * 10000})

      labels.forEach(function(label) {
        // console.log(label)

          var y = Array.from(reduceddata.values()).map((item) => { return item[label] / 1000})

          var transactiondetails = {
            type: 'line',
            name: label,
            x: x,
            y: y,
            mode: 'markers',
            hoverlabel:
                {
                  namelength: -1,
                  align: 'auto'
                },
            visible: (['avg', 'min', 'max'].includes(label)  ? 'yes' : 'legendonly'),
            marker: {
              // color: '#456E88',
              symbol	:	(['max', 'pct90', 'pct95','pct99'].includes(label)  ? 'triangle-up-open' :
                  (['min'].includes(label) ? 'triangle-down-open' : 'open')),

            }
          }

          alltransactions.push(transactiondetails)

      })

      var layout = {
        title: '',
        autosize: true,
        height: window.innerHeight * 0.7,
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

      this.$plotly.newPlot(document.getElementById("chart"), alltransactions, layout, config)

    }
  },

  mounted: async function () {
    this.drawChart()
  }
}
</script>

<template>
  <div class="row">
    <h1>{{ transaction }}</h1>
  </div>

  <div class="row">
    <div id="chart"></div>
  </div>

  <!-- <div>{{ responsetimes }}</div> -->
  <PlotlyChart :chartdetails="responsetimes"></PlotlyChart>


</template>

<style scoped>

</style>