<template>
  <form>
    <button type="button" class="btn btn-primary" v-on:click="initProgressBar">Init Progress Bar</button>
    <button type="button" class="btn btn-primary" v-on:click="incProgressBar">Inc Progress Bar</button>
    <button type="button" class="btn btn-primary" v-on:click="doneProgressBar">Done Progress Bar</button>
  </form>


</template>

<script>
export default {
  name: "NProgressView",
  methods: {
    initProgressBar: function () {
      console.log('Start progress bar')
      this.$nprogress.start()
    },
    incProgressBar: function () {
      console.log('Inc progress bar')
      this.$nprogress.inc()
    },
    doneProgressBar: function () {
      console.log('Done progress bar')
      this.$nprogress.done()
    },

  }
}

</script>

<style scoped>

</style>