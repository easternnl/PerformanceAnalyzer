<script>
import importjtl from "@/components/ImportJTL.vue";
import axios from "axios";

function fillJobs(foldername, tree) {
  // recursively walk through the folders and jobs received from Jenkins

  console.log('entering fillJobs with: ' + foldername + ' >> ' + tree)

  var data = []

  if (typeof tree.jobs !== 'undefined')   // make sure the folder has items, else skip to prevent an error
  {
    tree.jobs.forEach(function (item, index) {
      if (item._class == 'com.cloudbees.hudson.plugins.folder.Folder')
      {
        console.log('Populating ' + item.name + ' using: >')

        data = data.concat(fillJobs(foldername + item.name + '/', item))
      }
      else if (item._class == "org.jenkinsci.plugins.workflow.job.WorkflowJob")
      {
        console.log('  ' + foldername + item.name + ' => ' + item.url)

        data.push({ url: item.url, name: foldername + item.name})
      }
      else {
        console.log('unkown object: ' + item._class)
      }
    })

    return data
  }


}



export default {
  name: "JTLOpenJenkins",
  data() {
    return {
      jenkinsurl: 'https://jenkins-new.eastnet.nl/',
      jenkinsusername: '',
      jenkinspassword: '',
      jobs: [{}],
      builds: [{}],
      job: 0,
      build: 0,

    }
  },
  components: {importjtl},
  mounted() {
    this.$nprogress.done(true)
  },
  methods: {
    retreiveJobsFromJenkins() {
      axios.get(this.jenkinsurl + '/api/json?tree=jobs[name,url,jobs[name,url,jobs[name,url]]]', { withCredentials: true }).then((response) => {
        //got a response from
        console.log('Response received from ' + this.jenkinsurl)

        this.jobs = fillJobs('', response.data)
      })

    },
    retreiveBuildsFromJenkins() {
      axios.get(this.jobs[this.job].url + '/api/json?tree=allBuilds[number,result,timestamp,url,description,actions[parameters[name,value]]]', {withCredentials: true}).then((response) => {
        console.log('Response received from ' + this.jobs[this.job].url)

        this.builds = response.data.allBuilds

      })
    },
    retreiveArtifactsFromJenkins() {
      axios.get( this.builds[this.build].url + '/api/json' , { withCredentials: true}).then((response) => {
        console.log('Response received from ' + this.builds[this.build].url + '/api/json'  )

        console.log(response)

        console.log(response.data.artifacts)

        var jtlpath


        response.data.artifacts.forEach(function (item, index) {
          if (item.relativePath.split('.').pop() == "jtl")
          {
            console.log('Found JTL: ' + item.relativePath)

            jtlpath = item.relativePath
          }
        })

        axios.get(this.builds[this.build].url + '/artifact/' + jtlpath, {responseType: 'text', withCredentials: true}).then((response) => {
          // hand over the downloaded data to the import page
          this.$options.childInterface.startImport(response.data, this.jobs[this.job].name + ' / ' + this.builds[this.build].number)

        }).catch((response) => {
          console.error("Could not download: " + this.url, response);


        });

      })
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
      <span class="input-group-text">Jenkins</span>
      <input type="text" class="form-control" name="jenkinsurl" id="jenkinsurl" v-model="jenkinsurl" placeholder="URL to Jenkins server. You must be logged on to Jenkins to receive data!">

    </div>

    <!-- <div class="input-group mb-2">
      <span class="input-group-text">Username</span>
      <input type="text" class="form-control" name="jenkinsusername" id="jenkinsusername" v-model="jenkinsusername" placeholder="Username for Jenkins server, only needed when not logged on with cookie">
    </div>

    <div class="input-group mb-2">
      <span class="input-group-text">Password</span>
      <input type="password" class="form-control" name="jenkinspassword" id="jenkinspassword" v-model="jenkinspassword" placeholder="Password">
    </div> -->

    <div class="input-group mb-2">
      <button type="button" class="btn btn-primary mb-3" @click="retreiveJobsFromJenkins()">Browse</button>
    </div>
  </div>

  <div class="row mx-auto">
    <div class="input-group mb-2">
      <span class="input-group-text">Job</span>
      <select class="form-control" id="job" name="job" v-model="job" @change="retreiveBuildsFromJenkins()">
        <option v-for="(item, idx) in jobs" :key="idx" :value="idx">{{ item.name }}</option>
      </select>
    </div>
    <div class="input-group mb-2">
      <span class="input-group-text">Build</span>
      <select class="form-control" id="build" name="build" v-model="build">
        <option v-for="(item, idx) in builds" :key="idx" :value="idx">{{ item.number }} ({{ item.result }} - {{ item.description }}) </option>
      </select>
    </div>

    <div class="input-group mb-2">
      <button type="submit" class="btn btn-primary mb-3" @click="retreiveArtifactsFromJenkins()">Download</button>
    </div>
  </div>

  <importjtl @interface="jtlimportinterface"></importjtl>
</template>

<style scoped>

</style>