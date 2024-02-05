<script>

import { inject } from 'vue'
import GlobalVariables from "@/GlobalVariableHolder";
import MyTable from "@/components/MyTable.vue";

export default {
  name: 'JTLOverview',
  props: ['view'],
  components: {MyTable},
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
    testdata: function() {

      function humanizeDuration(duration)  // assume ms
      {
        var remainder
        var days
        var hours
        var minutes
        var seconds

        remainder = duration / 1000

        days = Math.floor(remainder / 86400);
        remainder = remainder % 86400

        hours = Math.floor(remainder / 3600)
        remainder = remainder % 3600

        minutes = Math.floor(remainder / 60)
        seconds = parseInt(remainder % 60)

        // console.log(days + ' day')
        // console.log(hours + ' hours')
        // console.log(minutes + ' minutes')
        // console.log(seconds + ' seconds')

        var returnstring = ''

        if (days > 0)
        {
          returnstring =  returnstring + (returnstring.length > 0 ? ', ' : '') + days + (days > 1 ? ' days' : 'day')
        }

        if (hours > 0)
        {
          returnstring =  returnstring + (returnstring.length > 0 ? ', ' : '') + hours + (hours > 1 ? ' hours' : 'hour')
        }

        if (minutes > 0)
        {
          returnstring = returnstring + (returnstring.length > 0 ? ', ' : '') + minutes + (minutes > 1 ? ' minutes' : 'minute')

        }

        if (seconds > 0)
        {
          returnstring =  returnstring + (returnstring.length > 0 ? ', ' : '') + seconds + (seconds > 1 ? ' seconds' : 'second')
        }

        return returnstring
      }


      return [
        { Name: 'Starttime', Value: this.$moment(GlobalVariables.variables.$jtlinfo["min"]).format('YYYY-MM-DD hh:mm:ss') },
        { Name: 'Stoptime', Value: this.$moment(GlobalVariables.variables.$jtlinfo["max"]).format('YYYY-MM-DD HH:mm:ss') },
        { Name: 'Duration', Value: humanizeDuration(GlobalVariables.variables.$jtlinfo["duration"]) },
        // giving the code as value { Name: 'Duration', Value: function() {
        //     var durationObj = this.$moment.duration(duration, unit);
        //     var durationStringArray = [];
        //
        //     Object.keys(durationObj._data)
        //         .filter((key) => durationObj._data[key] > 0)
        //         .forEach((key) => {
        //           durationStringArray.push(
        //               this.$moment.duration(durationObj._data[key], key).humanize()
        //           );
        //         });
        //     return durationStringArray.reverse().join(', ');
        //   }      },
      ]
    },
    alltransactionsoverviewtable: function() {
      console.time('alltransactionsoverviewtable')
      var reduceddata = this.$d3.rollup(GlobalVariables.variables.$jtldata.filter ((item) => {
            if (this.transactions.includes(item.label)) return item
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
              success: this.$d3.count (v,
                  e => { if (e.success == 'true') return true } ),
              failed: this.$d3.count (v,
                  e => { if (e.success == 'false') return true} ),
            }
          },
          d => d.label)

      // console.log(reduceddata)

      var data = []

      // reformat the output and the sequence of the labels to show in the table
      Array.from (reduceddata.keys ()).forEach(function(label) {

        data.push({
          Label: label,
          Average: Math.round(reduceddata.get(label)["avg"]  ) / 1000,
          Min: Math.round(reduceddata.get(label)["min"]  ) / 1000,
          Max: Math.round(reduceddata.get(label)["max"]  ) / 1000 ,
          Percentile90: Math.round(reduceddata.get(label)["pct90"]  ) / 1000,
          Percentile95: Math.round(reduceddata.get(label)["pct95"]  ) / 1000,
          Percentile99: Math.round(reduceddata.get(label)["pct99"]  ) / 1000,
          Count: Math.round(reduceddata.get(label)["count"]  ) ,
          Success: Math.round(reduceddata.get(label)["success"]  ) ,
          Failed: Math.round(reduceddata.get(label)["failed"]  ) ,
        })
      })

      console.timeEnd('alltransactionsoverviewtable')

      return data
    },
    allresponsemessages: function () {
      console.time('allresponsemessages')

      var reduceddata = this.$d3.rollup(GlobalVariables.variables.$jtldata.filter ((item) => {
        if (this.transactions.includes(item.label)) return item
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
        if (this.transactions.includes(item.label)) return item
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
        if (this.transactions.includes(item.label) && item.failureMessage != '' ) return true
      }), (v,e) => {
        return {
          count: this.$d3.count(v, e => e.elapsed),

        }
      }, d => d.failureMessage)
      // console.log('Failuremessages: ')
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
    <h1>Overview {{ view }}</h1>

    <my-table :tabledata="testdata"></my-table>
    <my-table :tabledata="alltransactionsoverviewtable"></my-table>
    <my-table :tabledata="allresponsecodes"></my-table>
    <my-table :tabledata="allresponsemessages"></my-table>
    <my-table :tabledata="allfailuremessages"></my-table>

  </div>
</template>

<style scoped>

</style>