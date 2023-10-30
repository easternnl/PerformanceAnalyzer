import { createRouter, createWebHistory, isNavigationFailure } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
//import NProgressView from "@/views/NProgressView.vue";
//import plotlyExampleView from "@/views/PlotlyExampleView.vue";
//import GZipExample from '@/views/GZipExample.vue';
import JTLOpenFile from "@/views/JTLOpenFile.vue";
import JTLOverview from "@/views/JTLOverview.vue";
import JTLSidebar from "@/components/JTLSidebar.vue";
import JTLTransaction from "@/views/JTLTransaction.vue";
import JTLBigChart from "@/views/JTLBigChart.vue";
import JTLFailureResponse from "@/views/JTLFailureResponse.vue";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import JTLFailureResponseChart from "../views/JTLFailureResponseChart.vue";
import JTLDebugFirstLast from "../views/JTLDebugFirstLast.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/open',
      name: 'open',
      component: JTLOpenFile
    },
    {
      path: '/jtloverviewnormal',
      name: 'JTLOverviewNormal',
      components: {
        default: JTLOverview,
        sidebar: JTLSidebar,

      },
      props: { default: { view: 'normal' }},
    },
    {
      path: '/jtloverviewhidden',
      name: 'JTLOverviewHidden',
      components: {
        default: JTLOverview,
        sidebar: JTLSidebar,

      },
      props: { default: { view: 'hidden' }},
    },
    {
      path: '/jtlbigchartnormal',
      name: 'JTLBigChartNormal',
      components: {
        default: JTLBigChart,
        sidebar: JTLSidebar
      },
      props: { default: { view: 'normal' }},
    },
    {
      path: '/jtlbigcharthidden',
      name: 'JTLBigChartHidden',
      components: {
        default: JTLBigChart,
        sidebar: JTLSidebar
      },
      props: { default: { view: 'hidden' }},
    },
    {
      path: '/jtlfailureresponsechart',
      name: 'JTLFailureResponseChart',
      components: {
        default: JTLFailureResponseChart,
        sidebar: JTLSidebar
      }
    },
    {
      path: '/jtlfailureresponse',
      name: 'JTLFailureResponse',
      components: {
        default: JTLFailureResponse,
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
      path: '/jtldebugfirstlast',
      name: 'JTLDebugFirstLast',
      components: {
        default: JTLDebugFirstLast,
        sidebar: JTLSidebar
      }
    }
  ]
})

router.beforeResolve ((to, from, next) => {
  // If this isn't an initial page load.
  console.log('beforeResolve')
  // NProgress.start()

  next()
})

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  console.log('Aftereach')

  // Any kind of navigation failure
  if (isNavigationFailure()) {
    console.log('Navigation failure')
    NProgress.done()
  }

})

router.beforeEach(async () => {
  // Complete the animation of the route progress bar.
  console.log('beforeEach')
  await NProgress.start()
  await new Promise(r => setTimeout(r, 50));  // this makes a little delay to start painting the progress bar
  console.log('awaited nprogress')


  //NProgress.done()
})

export default router
