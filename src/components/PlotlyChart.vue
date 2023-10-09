<script>
/*
  This Vue component

 */

import {v4 as uuidv4} from 'uuid';

export default {
  name: "PlotlyChart",
  props: {
    chartdetails: {
      type: Object,
      default: () => ({})
    },

  },
  watch: {
    chartdetails: function () {
      this.drawChart()
    }
  },
  computed: {
    chartid: function () {
      return uuidv4()
    }
  },
  methods: {
    drawChart: function () {
      this.$plotly.newPlot(document.getElementById(this.chartid), this.chartdetails["data"], this.chartdetails["layout"], this.chartdetails["config"])
    }
  },
  mounted: async function () {
    this.drawChart()
  }
}
</script>

<template>
  <div class="row">
    <div v-bind:id="chartid"></div>
  </div>
</template>

<style scoped>

</style>