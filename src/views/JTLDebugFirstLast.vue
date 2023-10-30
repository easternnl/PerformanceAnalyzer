<script>

import GlobalVariables from "@/GlobalVariableHolder";
import {all} from "axios";
import MyTable from "@/components/MyTable.vue";

export default {
  name: "JTLDebugFirstLast",
  components: {
    MyTable,
  },
  computed: {
    transactionsfirst10: function () {

      var reduceddata = this.$d3.sort (GlobalVariables.variables.$jtldata
              .map ((item) => { // return only the objects we really need
                return {
                  timeStamp: this.$moment.unix(item.timeStamp / 1000).format('YYYY-MM-DD HH:mm:ss.SSS'),
                  label: item.label,
                  elapsed: item.elapsed,
                  responseCode: item.responseCode,
                  responseMessage: item.responseMessage,
                  threadName: item.threadName,
                  success: item.success,
                  failureMessage: item.failureMessage,
                }
              }),
          (a,b) => this.$d3.ascending(a.timeStamp, b.timeStamp))
          .slice (0, 10)

      console.log('top10highest')

      this.$nprogress.inc()


      return reduceddata

    },
    transactionslast10: function () {

      var reduceddata = this.$d3.sort (GlobalVariables.variables.$jtldata
              .map ((item) => { // return only the objects we really need
                return {
                  timeStamp: this.$moment.unix(item.timeStamp / 1000).format('YYYY-MM-DD HH:mm:ss.SSS'),
                  label: item.label,
                  elapsed: item.elapsed,
                  responseCode: item.responseCode,
                  responseMessage: item.responseMessage,
                  threadName: item.threadName,
                  success: item.success,
                  failureMessage: item.failureMessage,
                }
              }),
          (a,b) => this.$d3.descending(a.timeStamp, b.timeStamp))
          .slice (0, 10)

      console.log('top10highest')

      this.$nprogress.inc()


      return reduceddata

    },
  }
}
</script>

<template>
  <div class="row">
    <h1>First 10 transactions</h1>
    <my-table :tabledata="transactionsfirst10"></my-table>

    <h1>Last 10 transactions</h1>
    <my-table :tabledata="transactionslast10"></my-table>
  </div>

</template>

<style scoped>

</style>