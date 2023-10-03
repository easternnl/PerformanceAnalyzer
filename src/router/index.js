import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
//import NProgressView from "@/views/NProgressView.vue";
//import plotlyExampleView from "@/views/PlotlyExampleView.vue";
//import GZipExample from '@/views/GZipExample.vue';
import JTLOpenFile from "@/views/JTLOpenFile.vue";
import JTLOverview from "@/views/JTLOverview.vue";
import JTLBaseView from "@/views/JTLBaseView.vue";
import JTLSidebar from "@/components/JTLSidebar.vue";
import JTLTransaction from "@/views/JTLTransaction.vue";
import JTLBigChart from "@/views/JTLBigChart.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // component: HomeView
    },
    {
      path: '/open',
      name: 'open',
      component: JTLOpenFile
    },
    {
      path: '/jtloverview',
      name: 'JTLBaseView',
      components: {
        default: JTLOverview,
        sidebar: JTLSidebar,
      }
    },
    {
      path: '/jtlbigchart',
      name: 'JTLBigChart',
      components: {
        default: JTLBigChart,
        sidebar: JTLSidebar
      }
    },
    {
      path: '/jtltransaction/:transaction',
      components: {
        default: JTLTransaction,
        sidebar: JTLSidebar
      }
    },
    {
      path: '/nprogress',
      name: 'nprogress',
  //    component: NProgressView
    },
    {
      path: '/plotlyexampleview',
      name: 'plotlyexampleview',
      // component: plotlyExampleView
    },
    {
      path: '/gzipexample',
      name: 'gzipexample',
      // component: GZipExample
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
