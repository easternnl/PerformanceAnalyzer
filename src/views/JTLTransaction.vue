<script>
import GlobalVariables from "@/GlobalVariableHolder";
import {all} from "axios";
import PlotlyChart from "@/components/PlotlyChart.vue";
import MyTable from "@/components/MyTable.vue";

export default {
  name: "JTLTransaction",
  components: {
    MyTable,
    PlotlyChart},
  computed: {
    responsetimes: function () {

      console.time('responsetimes')

      var config = {responsive: true}

      var data = []

      var reduceddata = this.$d3.rollup (GlobalVariables.variables.$jtldata.filter ((item) => {
            if (item["label"] == this.transaction) return item
          }),
          (d,e) => {
            return {
              avg: this.$d3.mean (d,
                  e => e.elapsed),
              max: this.$d3.max (d,
                  e => e.elapsed),
              min: this.$d3.min (d,
                  e => e.elapsed),
              pct90: this.$d3.quantile (d,
                  0.90,
                  e => e.elapsed),
              pct95: this.$d3.quantile (d,
                  0.95,
                  e => e.elapsed),
              pct99: this.$d3.quantile (d,
                  0.99,
                  e => e.elapsed),
              count: this.$d3.count (d,
                  e => e.elapsed),
            }
          },
          d => parseInt (d.timeStamp / 10000))

      var labels = ["avg","max","min","pct90","pct95","pct99"]

      var x = Array.from (reduceddata.keys ())
          .map ((item) => {
            return item * 10000
          })

      labels.forEach ((label) => {
        // console.log(label)

        var y = Array.from (reduceddata.values ())
            .map ((item) => {
              return item[label] / 1000
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
          visible: (['avg','min','max'].includes (label) ? 'yes' : 'legendonly'),
          marker: {
            // color: '#456E88',
            symbol: (['max','pct90','pct95','pct99'].includes (label) ? 'triangle-up-open' : (['min'].includes (label) ? 'triangle-down-open' : 'open')),

          }
        }

        data.push (transactiondetails)

      })

      var layout = {
        title: 'Responsetimes of ' + this.transaction,
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

      console.timeEnd('responsetimes')

      return retourobject

    },
    tps: function() {
      console.time('tps')

      var config = {responsive: true}

      var data = []

      var reduceddata = this.$d3.rollup (GlobalVariables.variables.$jtldata.filter ((item) => {
            if (item["label"] == this.transaction) return item
          }),
          (d,e) => {
            return {
              tps: this.$d3.count (d,
                  e => e.elapsed),
            }
          },
          d => parseInt (d.timeStamp / 10000))

      var labels = ["tps"]

      var x = Array.from (reduceddata.keys ())
          .map ((item) => {
            return item * 10000
          })

      labels.forEach ((label) => {
        // console.log(label)

        var y = Array.from (reduceddata.values ())
            .map ((item) => {
              return item[label] / 10
            })

        var transactiondetails = {
          type: 'line',
          name: label,
          x: x,
          y: y,
          mode: 'lines',
          hoverlabel: {
            namelength: -1,
            align: 'auto'
          },
          visible: 'yes',
          marker: {
            // color: '#456E88',
            symbol: 'open',

          }
        }

        data.push (transactiondetails)

      })

      var layout = {
        title: "TPS of " + this.transaction,
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

      console.timeEnd('tps')

      return retourobject

    },
    errorsovertime: function() {
      console.time('errorsovertime')

      var config = {responsive: true}

      var data = []

      var reduceddata = this.$d3.rollup (GlobalVariables.variables.$jtldata.filter ((item) => {
            if (item["label"] == this.transaction && item.success == 'false') return item
          }),
          (d,e) => {
            return {
              tps: this.$d3.count (d,
                  e => e.elapsed),
            }
          },
          d => parseInt (d.timeStamp / 10000))

      var labels = ["tps"]

      var x = Array.from (reduceddata.keys ())
          .map ((item) => {
            return item * 10000
          })

      labels.forEach ((label) => {
        // console.log(label)

        var y = Array.from (reduceddata.values ())
            .map ((item) => {
              return item[label] / 10
            })

        var transactiondetails = {
          type: 'line',
          name: label,
          x: x,
          y: y,
          mode: 'lines',
          hoverlabel: {
            namelength: -1,
            align: 'auto'
          },
          visible: 'yes',
          marker: {
            color: '#FF0000',
            symbol: 'open',

          }
        }

        data.push (transactiondetails)

      })

      var layout = {
        title: "Errors occuring over time for " + this.transaction,
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

      console.timeEnd('errorsovertime')

      return retourobject

    },

    responsetimespercentiles: function () {
      console.time('responsetimespercentiles')
      var config = {responsive: true}

      var data = []

      var reduceddata = this.$d3.rollup (GlobalVariables.variables.$jtldata.filter ((item) => {
            if (item["label"] == this.transaction) return item
          }),
          (d,e) => {
            return {
              10: this.$d3.quantile (d,0.1,  e => e.elapsed),
              20: this.$d3.quantile (d,0.2,  e => e.elapsed),
              30: this.$d3.quantile (d,0.3,  e => e.elapsed),
              40: this.$d3.quantile (d,0.4,  e => e.elapsed),
              50: this.$d3.quantile (d,0.5,  e => e.elapsed),
              60: this.$d3.quantile (d,0.6,  e => e.elapsed),
              70: this.$d3.quantile (d,0.7,  e => e.elapsed),
              80: this.$d3.quantile (d,0.8,  e => e.elapsed),
              90: this.$d3.quantile (d,0.9,  e => e.elapsed),
              95: this.$d3.quantile (d,0.95,  e => e.elapsed),
              99: this.$d3.quantile (d,0.99,  e => e.elapsed),
            }
          },
          )

      // console.log(Object.keys(reduceddata))



      var x = Object.keys(reduceddata)


      var y = Object.keys(reduceddata).map(function(label) {
        return reduceddata[label]
      })

      // console.log('x:')
      // console.log(x)
      // console.log('y:')
      // console.log(y)


      var transactiondetails = {
        type: 'line',
        name: 'Percentile',
        x: x,
        y: y,
        mode: 'lines',
        hoverlabel: {
          namelength: -1,
          align: 'auto'
        },
        visible: 'yes',
        marker: {
          // color: '#456E88',
          symbol: 'open',

        }
      }
      // console.log(transactiondetails)
      data.push (transactiondetails)



      var layout = {
        title: "Percentiles  of " + this.transaction,
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
          title: 'Percentile',
          //type: 'date',
          zeroline: true,
          nticks: 20,

        },
        yaxis: {
          tickformat: '',
          tick0: '0.0',
          title: 'responsetime in seconds',
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

      console.timeEnd('responsetimespercentiles')


      return retourobject


    },
    top10highestresponsetimes: function () {
      console.time('top10highestresponsetimes')

      var reduceddata = this.$d3.sort (GlobalVariables.variables.$jtldata.filter ((item) => {
            if (item["label"] == this.transaction) return item.label
          })
              .map ((item) => { // return only the objects we really need
                return {
                  timeStamp: this.$moment.unix(item.timeStamp / 1000).format('YYYY-MM-DD HH:mm:ss.SSS'),
                  elapsed: item.elapsed,
                  responseCode: item.responseCode,
                  responseMessage: item.responseMessage,
                  threadName: item.threadName,
                  success: item.success,
                  failureMessage: item.failureMessage,
                }
              }),
          (a,b) => this.$d3.descending (a.elapsed,
              b.elapsed))
          .slice (0, 10)

      console.timeEnd('top10highestresponsetimes')


      return reduceddata

    },
    top10lowestresponsetimes: function () {
      console.time('top10lowestresponsetimes')

      var reduceddata = this.$d3.sort (GlobalVariables.variables.$jtldata.filter ((item) => {
            if (item["label"] == this.transaction) return item.label
          })
              .map ((item) => { // return only the objects we really need
                return {
                  timeStamp: this.$moment.unix(item.timeStamp / 1000).format('YYYY-MM-DD HH:mm:ss.SSS'),
                  elapsed: item.elapsed,
                  responseCode: item.responseCode,
                  responseMessage: item.responseMessage,
                  threadName: item.threadName,
                  success: item.success,
                  failureMessage: item.failureMessage,
                }
              }),
          (a,b) => this.$d3.ascending(a.elapsed,
              b.elapsed))
          .slice (0,
              10)

      console.timeEnd('top10lowestresponsetimes')

      return reduceddata

    },
    transaction: function () {
      return this.$route.params.transaction
    },
    allresponsemessages: function () {
      console.time('allresponsemessages')
      var reduceddata = this.$d3.rollup(GlobalVariables.variables.$jtldata.filter ((item) => {
        if (item["label"] == this.transaction) return item.label
      }), (v,e) => {
        return {
          count: this.$d3.count(v, e => e.elapsed),
        }
      }, d => d.responseMessage)

      // console.log(reduceddata)

      var data = []

      // reformat the output and the sequence of the labels to show in the table
      Array.from (reduceddata.keys()).forEach(function(responseMessage) {
        data.push({
          responseMessage: responseMessage,
          Count: Math.round(reduceddata.get(responseMessage)["count"]  ) ,
        })
      })

      console.timeEnd('allresponsemessages')

      return data
    },
    allresponsecodes: function () {
      console.time('allresponsecodes')
      var reduceddata = this.$d3.rollup(GlobalVariables.variables.$jtldata.filter ((item) => {
        if (item["label"] == this.transaction) return item.label
      }), (v,e) => {
        return {
          count: this.$d3.count(v, e => e.responseCode),
        }
      }, d => d.responseCode)

      var data = []

      // reformat the output and the sequence of the labels to show in the table
      Array.from (reduceddata.keys()).forEach(function(responsecode) {
        data.push({
          Responsecode: responsecode,
          Count: Math.round(reduceddata.get(responsecode)["count"]  ) ,
        })
      })

      console.timeEnd('allresponsecodes')

      return data


    },
    allfailuremessages: function () {
      console.time('allfailuremessages')

      var reduceddata = this.$d3.rollup(GlobalVariables.variables.$jtldata.filter ((item) => {
        if (item["label"] == this.transaction && item.failureMessage != '') return item.label
      }), (v,e) => {
        return {
          count: this.$d3.count(v, e => e.elapsed),
        }
      }, d => d.failureMessage)

      // console.log(reduceddata)

      var data = []

      // reformat the output and the sequence of the labels to show in the table
      Array.from (reduceddata.keys()).forEach(function(failureMessage) {
        data.push({
          failureMessage: failureMessage,
          Count: Math.round(reduceddata.get(failureMessage)["count"]  ) ,
        })
      })

      console.timeEnd('allfailuremessages')

      return data


    },
  },
  mounted() {
    this.$nprogress.done(true);
  },
  beforeUpdate() {
    this.$nprogress.start();
  },
  updated() {
    this.$nprogress.done();
  },

}
</script>

<template>
  <div class="row">
    <h1>{{ transaction }}</h1>


    <PlotlyChart :chartdetails="responsetimes"></PlotlyChart>

    <PlotlyChart :chartdetails="tps"></PlotlyChart>
    <PlotlyChart :chartdetails="errorsovertime"></PlotlyChart>
    <PlotlyChart :chartdetails="responsetimespercentiles"></PlotlyChart>

  </div>


  <div class="row">
<!--    <h1>Top 10 highest</h1>-->
<!--    <my-table :tabledata="top10highestresponsetimes"></my-table>-->


<!--    <h1>Top 10 lowest</h1>-->
<!--    <my-table :tabledata="top10lowestresponsetimes"></my-table>-->

    <h1>All response messages</h1>
    <my-table :tabledata="allresponsemessages"></my-table>

    <h1>All response codes</h1>
    <my-table :tabledata="allresponsecodes"></my-table>

    <h1>All failure messages</h1>
    <my-table :tabledata="allfailuremessages"></my-table>
  </div>






</template>

<style scoped>

</style>