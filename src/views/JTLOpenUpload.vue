<script>
import Importjtl from "../components/ImportJTL.vue";
export default {
  name: "JTLOpenUpload",
  components: {Importjtl},
  mounted() {
    // runs at the begin of the page
    this.$nprogress.done(true)
  },
  methods: {
    uploadFile(file) {
      // function that really uploads the file from disk into memory
      return new Promise((resolve, reject) => {

        let fr = new FileReader();

        fr.onload = x=> resolve(fr.result);

        fr.onerror = function() {
          console.log("Error during loading file")
          console.log(fr.error);
        };

        return fr.readAsText(file);
        fr.read

      })
    },
    async upload() {
      // upload the JTL file
      console.log('Uploading')

      var input = document.getElementById("file")

      this.$nprogress.start()

      var data = await this.uploadFile(input.files[0]); // not sure if this construction is making the double amount of memory althoug it does not help with changing this construction

      // call the function in the child to process the file
      this.$options.childInterface.startImport(data, input.files[0].name)
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
      <span class="input-group-text">File</span>
      <input type="file" class="form-control" name="file" id="file" >
    </div>


    <div class="input-group mb-2">
      <button type="button" class="btn btn-primary mb-3" @click="upload()">Upload</button>
    </div>

  </div>

  <importjtl @interface="jtlimportinterface" ></importjtl>
</template>

<style scoped>

</style>