<template>
  <form>
    <button type="button" class="btn btn-primary" v-on:click="createPlot">createPlot</button>
 </form>
<div id="tester"></div>
</template>

<script>
export default {
  name: "PlotlyExampleView.vue",
  methods: {
    createPlot: function() {

      this.$plotly.newPlot( document.getElementById('tester'), [{

        x: [1, 2, 3, 4, 5],

        y: [1, 2, 4, 8, 16] }], {

        margin: { t: 0 } } );
    }
  }
}
</script>

<style scoped>

</style>