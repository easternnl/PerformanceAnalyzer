<script>
import GlobalVariables from "@/GlobalVariableHolder";
import PlotlyChart from "@/components/PlotlyChart.vue";
export default {
  name: "JTLFailureResponseOvertime.vue",
  components: {PlotlyChart},
  computed: {
    allnonsuccess: function() {
      console.time('allnonsuccess')
      var config = {responsive: true}

      var data = []

      var reduceddata = this.$d3.rollup (GlobalVariables.variables.$jtldata.filter ((item) => {
            if (item.success == 'false') return item
          }),
          (v,e) => {
            return {
              errors: this.$d3.count (v,
                  e => e.elapsed),
            }
          },
          d => d.label, d => parseInt (d.timeStamp / 10000))

      // console.log('Rollup map:')
      // console.log(reduceddata)

      Array.from (reduceddata.keys ()).forEach(function(label) {
        // console.log('Adding label ' + label)

        var x = Array.from (reduceddata.get(label).keys ())
            .map ((item) => {
              return item * 10000
            })

        var y = Array.from (reduceddata.get(label).values ())
            .map ((item) => {
              return item["errors"] / 10
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
          visible: 'yes',
          marker: {
            symbol: 'open',
          }
        }

        data.push (transactiondetails)

      })

      var layout = {
        title: 'Non successes per transactions', // this.transaction,
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
          nticks: 20,
          range: [
            GlobalVariables.variables.$jtlinfo["min"] - (GlobalVariables.variables.$jtlinfo["duration"] * 0.05),
            GlobalVariables.variables.$jtlinfo["max"] + (GlobalVariables.variables.$jtlinfo["duration"] * 0.05)
          ],
        },
        yaxis: {
          tickformat: '',
          tick0: '0.0',
          title: 'per second',
          rangemode: 'tozero'
        },
        showlegend: true,
        legend: {
          x: 1,
          y: 1,
          xanchor: 'right',
          bgcolor: '#fffff',
          borderwidth: 1,
          bordercolor: '#444',
          orientation: 'v',
          itemclick: 'toggleothers',
          itemdoubleclick: 'toggle',
          traceorder: 'normal'
        }
      }

      var retourobject = {
        data: data,
        layout: layout,
        config: config
      }

      console.timeEnd('allnonsuccess')
      return retourobject

    },
    non200: function() {
      console.time('non200')

      var config = {responsive: true}

      var data = []

      var reduceddata = this.$d3.rollup(GlobalVariables.variables.$jtldata.filter((item) => {
            if (item.responseCode != '200') return item
          }),
          (v, e) => {
            return {
              errors: this.$d3.count(v,
                  e => e.elapsed),
            }
          },
          d => d.responseCode, d => parseInt(d.timeStamp / 10000))

      // console.log('Rollup map:')
      // console.log(reduceddata)

      Array.from(reduceddata.keys()).forEach(function (label) {
        // console.log('Adding label ' + label)

        var x = Array.from(reduceddata.get(label).keys())
            .map((item) => {
              return item * 10000
            })

        var y = Array.from(reduceddata.get(label).values())
            .map((item) => {
              return item["errors"] / 10
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
          visible: 'yes',
          marker: {
            symbol: 'open',
          }
        }

        data.push(transactiondetails)

      })

      var layout = {
        title: 'Response codes overtime', // this.transaction,
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
          nticks: 20,
          range: [
            GlobalVariables.variables.$jtlinfo["min"] - (GlobalVariables.variables.$jtlinfo["duration"] * 0.05),
            GlobalVariables.variables.$jtlinfo["max"] + (GlobalVariables.variables.$jtlinfo["duration"] * 0.05)
          ],
        },
        yaxis: {
          tickformat: '',
          tick0: '0.0',
          title: 'per second',
          rangemode: 'tozero'
        },
        showlegend: true,
        legend: {
          x: 1,
          y: 1,
          xanchor: 'right',
          bgcolor: '#fffff',
          borderwidth: 1,
          bordercolor: '#444',
          orientation: 'v',
          itemclick: 'toggleothers',
          itemdoubleclick: 'toggle',
          traceorder: 'normal'
        }
      }

      var retourobject = {
        data: data,
        layout: layout,
        config: config
      }

      console.timeEnd('non200')
      return retourobject
    }

  },
  updated() {
    this.$nprogress.done(true)
  },
  mounted() {
    this.$nprogress.done(true)
  }
}
</script>

<template>
  <div class="row">

    <h1>Failures & Resonses</h1>

    <PlotlyChart :chartdetails="allnonsuccess"></PlotlyChart>
    <PlotlyChart :chartdetails="non200"></PlotlyChart>
  </div>

</template>

<style scoped>

</style>