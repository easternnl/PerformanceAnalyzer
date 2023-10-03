<script>
import GlobalVariables from "@/GlobalVariableHolder";

export default {
  name: "JTLBigChart",
  computed: {
    normaltransactions: function () {
      return [...new Set(GlobalVariables.variables.$jtldata.map(item => item.label).filter((data) => !data.startsWith('#')))];
    },
  },
  async mounted() {
    var alltransactions = []

    this.normaltransactions.forEach(function (label) {
      // walkthrough all transactions
      if (label.charAt(0) != '#') {

        console.log('Adding ' + label)

        var x = GlobalVariables.variables.$jtldata.filter(function (item) {
          if (item["label"] == label) return item

        }).map(function (item) {
          return item["timeStamp"];
        })

        var y = GlobalVariables.variables.$jtldata.filter(function (item) {
          if (item["label"] == label) return item
        }).map(function (item) {
          return item["elapsed"] / 1000;
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
              }
        }
        console.log(transactiondetails)
        alltransactions.push(transactiondetails)

      }

    })

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
        tick0: '0.1',
        title: 'seconds',
        rangemode: 'nonnegative'
      },
      legend: {
        orientation: 'v',
        traceorder: 'normal'

      }

    }

    var config = {responsive: true}

    this.$plotly.newPlot(document.getElementById("chart"), alltransactions, layout, config)
  }
}

</script>

<template>
  <h1>Grant chart</h1>

  <div id="chart"></div>

</template>

<style scoped>

</style>