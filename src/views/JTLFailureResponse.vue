<script>

import { inject } from 'vue'
import MyTable from "@/components/MyTable.vue";
import GlobalVariables from "@/GlobalVariableHolder";

export default {
  name: 'JTLAllFailureMessages',
  components: {MyTable},
  computed: {
    allfailuremessages: function () {
      var reduceddata = this.$d3.rollup(GlobalVariables.variables.$jtldata.filter ((item) => {
        if (item.failureMessage != '' ) return true
      }), (v,e) => {
        return {
          count: this.$d3.count(v, e => e.elapsed),

        }
      }, d => d.failureMessage)
      console.log('Failuremessages: ')
      // console.log(reduceddata)

      var data = []

      // reformat the output and the sequence of the labels to show in the table
      Array.from (reduceddata.keys()).forEach(function(failureMessage) {
        data.push({
          failureMessage: failureMessage,
          Count: Math.round(reduceddata.get(failureMessage)["count"]  ) ,
        })
      })

      return data


    },
    allresponsemessages: function () {
      var reduceddata = this.$d3.rollup(GlobalVariables.variables.$jtldata, (v,e) => {
        return {
          count: this.$d3.count(v, e => e.elapsed),

        }
      }, d => d.responseMessage)

      console.log(reduceddata)

      var data = []

      // reformat the output and the sequence of the labels to show in the table
      Array.from (reduceddata.keys()).forEach(function(responseMessage) {
        data.push({
          responseMessage: responseMessage,
          Count: Math.round(reduceddata.get(responseMessage)["count"]  ) ,
        })
      })

      return data
    },
    allresponsecodes: function () {
      var reduceddata = this.$d3.rollup(GlobalVariables.variables.$jtldata, (v,e) => {
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

      return data


    },




  },
  mounted() {
    console.log('Mounted')
    this.$nprogress.done(true);
  },
  beforeUpdate() {
    console.log('beforeUpdate')
    this.$nprogress.start();
  },
  updated() {
    console.log('Updated')
    this.$nprogress.done();
  },

}


</script>

<template>
  <div class="row">
    <h1>All Failures & errors</h1>
    <p>This is calculated over all transactions & hidden transactions</p>

    <my-table :tabledata="allfailuremessages"></my-table>
    <my-table :tabledata="allresponsemessages"></my-table>
    <my-table :tabledata="allresponsecodes"></my-table>

  </div>
</template>

<style scoped>

</style>