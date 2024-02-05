<template>

  <div class="row mx-auto" v-if="error">
    <p class="text-danger">
      {{ error }}
    </p>
  </div>

  <div class="row mx-auto">
    <input class="btn btn-primary" type="file" @change="readFile($event)">
  </div>

  <div class="row mx-auto">
    <table>
      <tr>
        <td>
          Import response messages:
        </td>
        <td>
          <input type="checkbox" v-model="responsemessages" v-bind:value="true">
        </td>
      </tr>
      <tr>
        <td>
          Import failure messages:
        </td>
        <td>
          <input type="checkbox" v-model="failuremessages" v-bind:value="true">
        </td>
      </tr>
      <tr>
        <td>
          Import hidden transactions:
        </td>
        <td>
          <input type="checkbox" v-model="hiddentransactions" v-bind:value="true">
        </td>
      </tr>
      <tr>
        <td>
          Import thread names
        </td>
        <td>
          <input type="checkbox" v-model="threadnames" v-bind:value="true">
        </td>
      </tr>
    </table>




  </div>
</template>

<script>

import { inject } from 'vue'
import GlobalVariables from "@/GlobalVariableHolder";

export default {
  data() {
    return {
      responsemessages: true,
      failuremessages: true,
      hiddentransactions: true,
      threadnames: true,
      error: ''
    }
  },
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
    async readFile(input) {

      this.$nprogress.start()


      console.time("Uploading file")

      console.log(input.target.files[0])

      var lines = await this.uploadFile(input.target.files[0]); // not sure if this construction is making the double amount of memory althoug it does not help with changing this construction

      console.timeEnd('Uploading file')


      console.log('Imported lines: ' + lines.length)

      if (!lines.length == 0) {

        await this.$nprogress.inc(0.4)

        console.log("Parsing data")
        console.time('Parsing csv data to d3 object')

        GlobalVariables.variables.$jtldata = this.$d3.csvParse(lines, (d) => {  // await this.uploadFile(input.target.files[0]); is possible as well
          if ((!d.label.startsWith('#')) || (d.label.startsWith('#') && this.hiddentransactions)) { // import hidden transaction
            return {
              timeStamp: +d.timeStamp,    // convert to number
              elapsed: +d.elapsed,
              label: d.label,
              responseCode: +d.responseCode,
              responseMessage: (this.responsemessages) ? d.responseMessage : '',
              threadName: (this.threadnames) ? d.threadName : '',
              dataType: d.dataType,
              success: d.success,
              failureMessage: (this.failuremessages) ? d.failureMessage : '',
              bytes: +d.bytes,
              sentBytes: +d.sentBytes,
              grpThreads: +d.grpThreads,
              allThreads: +d.allThreads,
              URL: d.URL,
              Latency: +d.Latency,
              IdleTime: +d.IdleTime,
              Connect: +d.Connect

            };
          }

        });
        console.timeEnd('Parsing csv data to d3 object')

        await this.$nprogress.inc(0.7)

        console.time('Calculating meta data')

        GlobalVariables.variables.$jtlinfo["min"] = this.$d3.min(GlobalVariables.variables.$jtldata, e => e.timeStamp)
        GlobalVariables.variables.$jtlinfo["max"] = this.$d3.max(GlobalVariables.variables.$jtldata, e => e.timeStamp)
        GlobalVariables.variables.$jtlinfo["duration"] = GlobalVariables.variables.$jtlinfo["max"] - GlobalVariables.variables.$jtlinfo["min"]
        GlobalVariables.variables.$jtlinfo["filename"] = input.target.files[0].name

        console.timeEnd('Calculating meta data')

        console.log(GlobalVariables.variables.$jtldata)

        await this.$nprogress.inc(0.8)

        this.$router.push('/jtloverviewnormal')
      }
      else
      {
        this.error = "Failed to load file " + input.target.files[0].name + '<br> This is possible a memory limit in the browser. Try reducing the dataset with unclicking some options'

        await this.$nprogress.done()
      }
    }

  },
};
</script>

<style scoped>

</style>