<script>
import GlobalVariables from "@/GlobalVariableHolder";
export default {
  name: "importjtl",
  data() {
    return {
      responsemessages: true,
      failuremessages: true,
      hiddentransactions: true,
      threadnames: true,
    }
  },
  mounted() {
    this.emitInterface();
  },
  methods: {
    startImport(data, filename) {
      // start the actual import
      console.log('Start importing: ' + filename + '(' + data.length +')')
      // console.log('Data: ' + data)

      if (!data.length == 0) {

        this.$nprogress.inc(0.4)

        console.log("Parsing data")
        console.time('Parsing csv data to d3 object')

        GlobalVariables.variables.$jtldata = this.$d3.csvParse(data, (d) => {  // await this.uploadFile(input.target.files[0]); is possible as well
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

        this.$nprogress.inc(0.7)

        console.time('Calculating meta data')

        GlobalVariables.variables.$jtlinfo["min"] = this.$d3.min(GlobalVariables.variables.$jtldata, e => e.timeStamp)
        GlobalVariables.variables.$jtlinfo["max"] = this.$d3.max(GlobalVariables.variables.$jtldata, e => e.timeStamp)
        GlobalVariables.variables.$jtlinfo["duration"] = GlobalVariables.variables.$jtlinfo["max"] - GlobalVariables.variables.$jtlinfo["min"]
        GlobalVariables.variables.$jtlinfo["filename"] = filename

        console.timeEnd('Calculating meta data')

        console.log(GlobalVariables.variables.$jtldata)

        this.$nprogress.inc(0.8)

        this.$router.push('/jtloverviewnormal')
      }
    },
    /**
     * Emitting an interface with callable methods from outside
     */
    emitInterface() {
      this.$emit("interface", {
        startImport: (data, filename) => this.startImport(data, filename)
      });
    }
  }
}
</script>

<template>

  <button class="btn btn-light" type="button" data-bs-toggle="collapse" data-bs-target="#advancedoptions" aria-expanded="false" aria-controls="advancedoptions">
    Advanced options
  </button>

  <div class="collapse" id="advancedoptions">

    <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" role="switch"  v-model="responsemessages" v-bind:value="true" id="responsemessages">
      <label class="form-check-label" for="responsemessages">Import response messages:</label>
    </div>
    <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" role="switch"  v-model="failuremessages" v-bind:value="true" id="failuremessages">
      <label class="form-check-label" for="failuremessages">Import failure messages</label>
    </div>
    <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" role="switch"  v-model="hiddentransactions" v-bind:value="true" id="hiddentransactions">
      <label class="form-check-label" for="responsemessages">Import hidden transactions</label>
    </div>
    <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" role="switch"  v-model="threadnames" v-bind:value="true" id="threadnames">
      <label class="form-check-label" for="responsemessages">Import thread names</label>
    </div>

  </div>

</template>

<style scoped>

</style>