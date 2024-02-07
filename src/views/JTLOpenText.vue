<script>
import Importjtl from "../components/ImportJTL.vue";

export default {
  name: "JTLOpenText",
  data() {
    return {
      jtltext: 'timeStamp,elapsed,label,responseCode,responseMessage,threadName,dataType,success,failureMessage,bytes,sentBytes,grpThreads,allThreads,URL,Latency,IdleTime,Connect\n' +
          '1645424468641,530,01.IndexPage,200,"Number of samples in transaction : 2, number of failing samples : 0",jp@gc - Ultimate Thread Group 1-1,,true,,49177,915,1,1,null,305,1346,187\n' +
          '1645424470517,120,02.ProductPage,200,"Number of samples in transaction : 2, number of failing samples : 0",jp@gc - Ultimate Thread Group 1-1,,true,,54641,1028,1,1,null,118,1681,0\n' +
          '1645424523085,144,01.IndexPage,200,"Number of samples in transaction : 2, number of failing samples : 0",jp@gc - Ultimate Thread Group 1-1,,true,,49177,915,1,1,null,57,1192,20\n' +
          '1645424524422,97,02.ProductPage,200,"Number of samples in transaction : 2, number of failing samples : 0",jp@gc - Ultimate Thread Group 1-1,,true,,54643,1028,1,1,null,95,1056,0\n' +
          '1645424525586,167,03.AddToCart,200,"Number of samples in transaction : 3, number of failing samples : 0",jp@gc - Ultimate Thread Group 1-1,,true,,13124,2371,1,1,null,167,1883,0\n' +
          '1645424527637,112,04.GoToPayment,200,"Number of samples in transaction : 2, number of failing samples : 0",jp@gc - Ultimate Thread Group 1-1,,true,,43665,1080,1,1,null,111,0,0\n' +
          '1645424527749,0,05.GoToPayment2,200,"Number of samples in transaction : 0, number of failing samples : 0",,,true,,0,0,0,0,null,0,0,0\n'
    }
  },
  components: {Importjtl},
  mounted() {
    // runs at the begin of the page
    this.$nprogress.done(true)
  },
  methods: {
    upload() {
      // upload the JTL file
      console.log('Uploading')

      // call the function in the child to process the file
      this.$options.childInterface.startImport(this.jtltext, 'upload.txt')
    },
    jtlimportinterface(childInterface) {
      this.$options.childInterface = childInterface
    }
  }
}
</script>

<template>
  <div class="row mx-auto">
    <div class="input-group mb-2">
      <label for="jtltext" class="form-label">Example textarea</label>
    </div>
    <div class="input-group mb-2">
      <textarea class="form-control" id="jtltext" rows="20" v-model="jtltext"></textarea>
    </div>

    <div class="input-group mb-2">
      <button type="submit" class="btn btn-primary mb-3" @click="upload()">Upload</button>
    </div>

  </div>

  <importjtl @interface="jtlimportinterface" ></importjtl>

</template>

<style scoped>

</style>