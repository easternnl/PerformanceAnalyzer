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
  mounted() {
    console.log('Mounted')
    this.$nprogress.done(true)
  },
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

      this.$nprogress.start()

      console.log("Loading lines")
      var lines = await this.uploadFile(input.target.files[0]);

      console.log("Lines loaded")

      await this.$nprogress.inc(0.4)

      console.log("Parsing data")

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
      console.log("Parsing done")
      await this.$nprogress.inc(0.7)

      console.log("Calculating meta data)")

      GlobalVariables.variables.$jtlinfo["min"] = this.$d3.min (GlobalVariables.variables.$jtldata,e => e.timeStamp)
      GlobalVariables.variables.$jtlinfo["max"] = this.$d3.max (GlobalVariables.variables.$jtldata,e => e.timeStamp)
      GlobalVariables.variables.$jtlinfo["duration"] = GlobalVariables.variables.$jtlinfo["max"] - GlobalVariables.variables.$jtlinfo["min"]
      GlobalVariables.variables.$jtlinfo["filename"] = input.target.files[0]

      console.log("Calculating meta data done)")

      console.log(GlobalVariables.variables.$jtldata)
      console.log('Readfile finished')

      await this.$nprogress.inc(0.8)

      this.$router.push('/jtloverviewnormal')
    }

  },
};
</script>

<style scoped>

</style>