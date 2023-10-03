import GlobalVariables from "./GlobalVariableHolder";

import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap"

import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

import Plotly from 'plotly.js-dist'

import Moment from 'moment'

import Axios from 'Axios'

// import * as d3 from "d3v4";
import * as d3 from "d3";
//import * as d3 from "d3-array";

// import { count } as d3arr from "d3-array";

import * as fflate from 'fflate';

import YAML from 'yaml'

import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'

// import streamhttp from 'stream-http' // => results in error global is not defined

const app = createApp(App)

app.config.globalProperties.$jtldata = 'init'
app.config.globalProperties.$nprogress = nprogress; // Allow nprogress in all componenets this.$nprogress.function()
app.config.globalProperties.$plotly = Plotly; // Allow Plotly in all componenets this.$plotly
app.config.globalProperties.$moment = Moment; // use moment everywhere in the app
app.config.globalProperties.$http = Axios; // Allow axios in all componenets this.$http
// app.config.globalProperties.$streamhttp = streamhttp; // Allow streamhttp in all components this.$streamhttp
app.config.globalProperties.$d3 = d3; // Allow d3 in all componenets this.$d3
app.config.globalProperties.$fflate = fflate; // Allow fflate in all componenets this.$fflate
app.config.globalProperties.$yaml = YAML; // Allow yaml in all componenets this.$yaml

GlobalVariables.variables = app.config.globalProperties;

app.use(router)

app.mount('#app')
