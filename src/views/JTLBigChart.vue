<script>
import GlobalVariables from "@/GlobalVariableHolder";
import PlotlyChart from "@/components/PlotlyChart.vue";
import {ref} from "vue";
import MyFilterDropdown from "../components/MyFilterDropdown.vue";

export default {
  name: "JTLBigChart",
  props: ['view'],
  components: {MyFilterDropdown, PlotlyChart},
  computed: {
    transactions: function () {
      // console.log('Current view is: ' + this.view)

      if (this.view == 'normal') {
        // console.log('Returning normal transactions')
        return [...new Set(GlobalVariables.variables.$jtldata.map(item => item.label).filter((data) => !data.startsWith('#')))];
      }
      else if (this.view == 'hidden')
      {
        // console.log('Returning hidden transactions')
        return [...new Set(GlobalVariables.variables.$jtldata.map(item => item.label).filter((data) => data.startsWith('#')))];
      }
      else
      {
        // console.log('Returning ALL TRANSACTIONS')
        return [...new Set(GlobalVariables.variables.$jtldata.map(item => item.label))];  // return all
      }

    },
    responsetimes: function () {
      console.time('responsetimes')

      var config = {responsive: true}

      var data = []

      var reduceddata = this.$d3.rollup (GlobalVariables.variables.$jtldata.filter ((item) => {
            if (this.filteredtransactions.includes(item.label)) return item
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

      // console.log('Rollup map:')
      // console.log(reduceddata)

      this.filteredtransactions.forEach(function (label) {
        // console.log('Adding label ' + label)

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
          nticks: 20,
          range: [
            GlobalVariables.variables.$jtlinfo["min"] - (GlobalVariables.variables.$jtlinfo["duration"] * 0.05),
            GlobalVariables.variables.$jtlinfo["max"] + (GlobalVariables.variables.$jtlinfo["duration"] * 0.05)
          ],
        },
        yaxis: {
          tickformat: '',
          tick0: '0.0',
          title: 'seconds',
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

      // console.log ("retourobject: ")
      // console.log (retourobject)
      console.timeEnd('responsetimes')
      return retourobject

    },
    tps: function() {
      console.time('tps')
      var config = {responsive: true}

      var data = []

      var reduceddata = this.$d3.rollup (GlobalVariables.variables.$jtldata.filter ((item) => {
            if (this.filteredtransactions.includes(item.label)) return item
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
          nticks: 20,
          range: [
            GlobalVariables.variables.$jtlinfo["min"] - (GlobalVariables.variables.$jtlinfo["duration"] * 0.05),
            GlobalVariables.variables.$jtlinfo["max"] + (GlobalVariables.variables.$jtlinfo["duration"] * 0.05)
          ],
        },
        yaxis: {
          tickformat: '',
          tick0: '0.0',
          title: 'transactions per second',
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

      // console.log ("retourobject: ")
      // console.log (retourobject)
      console.timeEnd('tps')
      return retourobject

    },
    allnonsuccess: function() {
      console.time('allnonsuccess')
      var config = {responsive: true}

      var data = []

      var reduceddata = this.$d3.rollup (GlobalVariables.variables.$jtldata.filter ((item) => {
            if (this.filteredtransactions.includes(item.label) && item.success == 'false') return item
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
        title: 'Errors per transactions', // this.transaction,
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
          title: 'errors per second',
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

      // console.log ("retourobject: ")
      // console.log (retourobject)
      console.timeEnd('allnonsuccess')
      return retourobject

    }

  },
  updated() {
    this.$nprogress.done(true)
  },
  mounted() {
    this.$nprogress.done(true)

    this.filteredtransactions = this.transactions
  },
  data() {
    return {
      filteredtransactions: ref([])
    }
  }
}

</script>

<template>
  <div class="row">
    <MyFilterDropdown caption="Filter transactions" :selectableitems="transactions" @selecteditems="(a) => filteredtransactions = a"></MyFilterDropdown>
  </div>

  <div class="row">
    <h1>Overview chart of all transactions</h1>
    <PlotlyChart :chartdetails="responsetimes"></PlotlyChart>
    <PlotlyChart :chartdetails="tps"></PlotlyChart>
    <PlotlyChart :chartdetails="allnonsuccess"></PlotlyChart>
  </div>
</template>

<style scoped>

</style>