<template>
  <div class="row mx-auto">
    <p>Open the JTL file</p>


    <input class="btn btn-primary" type="file" @change="readFile($event)">
  </div>
</template>

<script>

import { inject } from 'vue'
import GlobalVariables from "@/GlobalVariableHolder";

export default {
  methods: {
    onChange(event) {
      this.$emit('update:modelValue', event.target.files[0]);
    },
    uploadFile(file) {
        return new Promise((resolve, reject) => {
          console.log('Init upload file')

          let fr = new FileReader();
          fr.onload = x=> resolve(fr.result);
          fr.readAsText(file);



          console.log('Finished upload file')
        })
    },
    async readFile(input) {
      console.log("Init readfile")
      console.log(GlobalVariables.variables.$jtldata)


      var lines = await this.uploadFile(input.target.files[0]);

      GlobalVariables.variables.$jtldata = this.$d3.csvParse(lines, (d) => {
        return {
          // year: new Date(+d.Year, 0, 1), // lowercase and convert "Year" to Date
          // make: d.Make, // lowercase
          // model: d.Model, // lowercase
          // length: +d.Length // lowercase and convert "Length" to number
          timeStamp: +d.timeStamp,    // convert to number
          elapsed: +d.elapsed,
          label: d.label,
          responseCode: +d.responseCode,
          responseMessage: d.responseMessage,
          threadName: d.threadName,
          dataType: d.dataType,
          success: d.success,
          failureMessage: d.failureMessage,
          bytes: +d.bytes,
          sentBytes: +d.sentBytes,
          grpThreads: +d.grpThreads,
          allThreads: +d.allThreads,
          URL: d.URL,
          Latency: +d.Latency,
          IdleTime: +d.IdleTime,
          Connect: +d.Connect

        };
      });

      console.log(GlobalVariables.variables.$jtldata)
      console.log('Readfile finished')

      this.$router.push('/jtloverview')
    }

  },
};
</script>

<style scoped>

</style>