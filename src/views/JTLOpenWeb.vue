<script>
import importjtl from "../components/ImportJTL.vue";
import axios from "axios";

export default {
  name: "JTLOpenWeb",
  data() {
    return {
      url: '',
    }
  },
  components: {importjtl},
  mounted() {
    this.$nprogress.done(true)
  },
  methods: {
    download() {
      // download the file from URL

      axios.get(this.url, {responseType: 'text'}).then((response) => {

        // Let the user save the file.

        this.$options.childInterface.startImport(response.data, 'download.jtl')

      }).catch((response) => {
        console.error("Could not download: " + this.url, response);
      });

      // call the function in the child to process the file


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
      <span class="input-group-text">URL</span>
      <input type="text" class="form-control" name="url" id="url" v-model="url">
    </div>

    <div class="input-group mb-2">
      <button type="submit" class="btn btn-primary mb-3" @click="download()">Download</button>
    </div>
  </div>

  <importjtl @interface="jtlimportinterface"></importjtl>
</template>

<style scoped>

</style>