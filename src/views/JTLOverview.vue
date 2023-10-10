<script>

import { inject } from 'vue'
import GlobalVariables from "@/GlobalVariableHolder";
import MyTable from "@/components/MyTable.vue";

export default {
  name: 'JTLOverview',
  components: {MyTable},
  computed: {
    normaltransactions: function () {
      return [...new Set(GlobalVariables.variables.$jtldata.map(item => item.label).filter((data) => !data.startsWith('#')))];
    },
    hiddentransactions: function () {
      return [...new Set(GlobalVariables.variables.$jtldata.map(item => item.label).filter((data) => data.startsWith('#')))];
    },
    alltransactionsoverviewtable: function() {
      var reduceddata = this.$d3.rollup(GlobalVariables.variables.$jtldata.filter ((item) => {
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
          d => d.label)

      console.log(reduceddata)

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
        })
      })

      return data
    }



  }
}


</script>

<template>
  <div class="row">
    <h1>Overview</h1>

    <my-table :tabledata="alltransactionsoverviewtable"></my-table>
<!--    <my-table :tabledata="alltransactionsoverviewtable"></my-table>-->
  </div>
</template>

<style scoped>

</style>