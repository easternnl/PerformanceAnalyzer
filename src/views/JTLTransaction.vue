<script>
import GlobalVariables from "@/GlobalVariableHolder";
import {all} from "axios";

export default {
  name: "JTLTransaction",
  computed: {
    transaction: function () {
      return this.$route.params.transaction
    }
  },
  watch: {
    transaction: function() {
      console.log('Calling refresh')
      this.drawChart()
    }
  },
  methods: {
    drawChart: function() {
      console.log(this.transaction)
      console.log(this)

      var config = {responsive: true}

      var alltransactions = []

      // var d3 = this.$d3
      // var transaction = this.transaction
      //
      // var reduceddata = this.$d3.nest().key(function (d) { return d.label } ).key(function (d) { return parseInt(d.timeStamp / 10000 ) }).rollup(function(d) {
      //   return {
      //     avg: d3.mean(d, e => e.elapsed),
      //     max: d3.max(d, e => e.elapsed),
      //     min: d3.min(d, e => e.elapsed),
      //     pct90: d3.quantile(d, 0.90, e => e.elapsed),
      //     pct95: d3.quantile(d, 0.95, e => e.elapsed),
      //     pct99: d3.quantile(d, 0.99, e => e.elapsed),
      //     //count: d3.count(d, e => e.elapsed),
      //   }  }).entries(GlobalVariables.variables.$jtldata.filter(function(item) { if (item["label"] == transaction) return item } ));

      var reduceddata = this.$d3.nest().key((d) => {
        return d.label
      }).key((d) => {
        return parseInt(d.timeStamp / 10000)
      }).rollup((d) => {
        return {
          avg: this.$d3.mean(d, e => e.elapsed),
          max: this.$d3.max(d, e => e.elapsed),
          min: this.$d3.min(d, e => e.elapsed),
          pct90: this.$d3.quantile(d, 0.90, e => e.elapsed),
          pct95: this.$d3.quantile(d, 0.95, e => e.elapsed),
          pct99: this.$d3.quantile(d, 0.99, e => e.elapsed),
          count: this.$d3.count(d, e => e.elapsed),
        }
      }).entries(GlobalVariables.variables.$jtldata.filter((item) => {
        if (item["label"] == this.transaction) return item
      }));

      console.log(reduceddata)
      console.log(reduceddata[0].values)
      var labels = ["avg", "max", "min", "pct90", "pct95", "pct99"]

      labels.forEach(function (label) {
        console.log('Label: ' + label)

        var x = reduceddata[0].values.map(function (item) {
          return item.key * 10000;
        })

        var y = reduceddata[0].values.map(function (item) {
          console.log(label)
          return item.value[label] / 1000;
        })

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
        console.log(transactiondetails)
        alltransactions.push(transactiondetails)

        console.log(x)
        console.log(y)
      })

      console.log(reduceddata[0].values[0].key)
      console.log(reduceddata[0].values[0].value['avg'])


      var layout = {
        //title:'Responsetimes for ' + this.transaction,
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


</template>

<style scoped>

</style>