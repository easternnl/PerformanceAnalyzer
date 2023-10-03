<script>

import { inject } from 'vue'
import GlobalVariables from "@/GlobalVariableHolder";

export default {
  name: 'JTLOverview',
  computed: {
    normaltransactions: function () {
      return [...new Set(GlobalVariables.variables.$jtldata.map(item => item.label).filter((data) => !data.startsWith('#')))];
    },
    hiddentransactions: function () {
      return [...new Set(GlobalVariables.variables.$jtldata.map(item => item.label).filter((data) => data.startsWith('#')))];
    }


  }
}


</script>

<template>
  <p>Hello</p>

    <p>Normal Transactions: {{ normaltransactions }}</p>
  <p>Hidden Transactions: {{ hiddentransactions }}</p>
</template>

<style scoped>

</style>