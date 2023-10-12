<template>

  <ul class="list-unstyled">
    <li class="mb-1">
      <button class="btn btn-toggle dropdown-toggle" data-bs-toggle="collapse" data-bs-target="#overview-collapse" aria-expanded="false">
        Summary
      </button>
      <div class="collapse show" id="overview-collapse">
        <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 ">
          <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary" >
            <div class="list-group list-group-flush scrollarea">
              <router-link to="/jtloverview" class="list-group-item list-group-item-action py-3 lh-sm border-0">
                <div class="d-flex w-100 align-items-center justify-content-between">
                  <strong class="mb-1">Overview</strong>
                  <small>Tip</small>
                </div>
                <div class="col-10 mb-1 small">Table displaying overview with summary of all transactions</div>
              </router-link>
              <router-link to="/jtlbigchart" class="list-group-item list-group-item-action py-3 lh-sm border-0">
                <div class="d-flex w-100 align-items-center justify-content-between">
                  <strong class="mb-1">All transaction chart</strong>
                  <small class="text-body-secondary">Tip</small>
                </div>
                <div class="col-10 mb-1 small">Grand chart with all transaction in one overview</div>
              </router-link>
            </div>
          </div>
        </ul>
      </div>
    </li>

    <li class="border-top mb-1">
      <button class="btn btn-toggle dropdown-toggle" data-bs-toggle="collapse" data-bs-target="#transactions-collapse" aria-expanded="false">
        Transactions
      </button>
      <div class="collapse" id="transactions-collapse">
        <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 ">
          <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary" >
            <div class="list-group list-group-flush scrollarea">

                <router-link class="list-group-item list-group-item-action py-3 lh-sm border-0" v-for="(transaction, index) in normaltransactions" :key="index" :to="'/jtltransaction/' + encodeURIComponent(transaction)">
                  <!-- <a href="#x1" class="list-group-item list-group-item-action py-3 lh-sm border-0"> -->
                  <div class="d-flex w-100 align-items-center justify-content-between">
                    <strong class="mb-1">{{ transaction }}</strong>

                  </div>
                  <div class="col-10 mb-1 small">Details of transaction {{ transaction }}</div>
                  <!-- </a> -->
                </router-link>

            </div>

          </div>
        </ul>
      </div>
    </li>
    <li class="border-top mb-1">
      <button class="btn btn-toggle dropdown-toggle" data-bs-toggle="collapse" data-bs-target="#hiddentransactions-collapse" aria-expanded="false">
        Hidden (#) Transactions
      </button>
      <div class="collapse" id="hiddentransactions-collapse">
        <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 ">
          <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary" >
            <div class="list-group list-group-flush scrollarea">
              <router-link class="list-group-item list-group-item-action py-3 lh-sm border-0" v-for="(transaction, index) in hiddentransactions" :key="index" :to="'/jtltransaction/' + encodeURIComponent(transaction)">
                <!-- <a href="#x1" class="list-group-item list-group-item-action py-3 lh-sm border-0"> -->
                <div class="d-flex w-100 align-items-center justify-content-between">
                  <strong class="mb-1">{{ transaction }}</strong>

                </div>
                <div class="col-10 mb-1 small">Details of transaction {{ transaction }}</div>
                <!-- </a> -->
              </router-link>
            </div>

          </div>
        </ul>
      </div>
    </li>
    <li class="border-top mb-1">
      <button class="btn btn-toggle dropdown-toggle" data-bs-toggle="collapse" data-bs-target="#errorsfailures-collapse" aria-expanded="false">
        Errors & Failures
      </button>
      <div class="collapse" id="errorsfailures-collapse">
        <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary" >
          <div class="list-group list-group-flush scrollarea">
            <a href="#x1" class="list-group-item list-group-item-action py-3 lh-sm border-0">
              <div class="d-flex w-100 align-items-center justify-content-between">
                <strong class="mb-1">All errors</strong>

              </div>
              <div class="col-10 mb-1 small">All non 200 response codes</div>
            </a>
            <a href="#x2" class="list-group-item list-group-item-action py-3 lh-sm">
              <div class="d-flex w-100 align-items-center justify-content-between">
                <strong class="mb-1">All failuremessages</strong>

              </div>
              <div class="col-10 mb-1 small">Shows all failure messages</div>
            </a>
          </div>

        </div>
      </div>
    </li>

    <li class="border-top mb-1">
      <button class="btn btn-toggle dropdown-toggle" data-bs-toggle="collapse" data-bs-target="#debug-collapse" aria-expanded="false">
        Debug
      </button>
      <div class="collapse" id="debug-collapse">
        <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary" >
          <div class="list-group list-group-flush scrollarea">
            <a href="#x1" class="list-group-item list-group-item-action py-3 lh-sm border-0">
              <div class="d-flex w-100 align-items-center justify-content-between">
                <strong class="mb-1">x1x</strong>
                <small>Pro</small>
              </div>
              <div class="col-10 mb-1 small">Some placeholder content in a paragraph below the heading and date.</div>
            </a>
            <a href="#x2" class="list-group-item list-group-item-action py-3 lh-sm">
              <div class="d-flex w-100 align-items-center justify-content-between">
                <strong class="mb-1">List group item heading</strong>
              </div>
              <div class="col-10 mb-1 small">Some placeholder content in a paragraph below the heading and date.</div>
            </a>
            <a href="#x3" class="list-group-item list-group-item-action py-3 lh-sm">
              <div class="d-flex w-100 align-items-center justify-content-between">
                <strong class="mb-1">List group item heading</strong>
              </div>
              <div class="col-10 mb-1 small">Some placeholder content in a paragraph below the heading and date.</div>
            </a>
          </div>

        </div>
      </div>
    </li>
  </ul>

</template>

<script>
import GlobalVariables from "@/GlobalVariableHolder";

export default {
  name: "SideBar",
  computed: {
    normaltransactions: function () {
      var uniquevalues = [...new Set(GlobalVariables.variables.$jtldata.map(item => item.label).filter((data) => !data.startsWith('#')))];

      uniquevalues = this.$d3.sort(uniquevalues)

      return uniquevalues
    },
    hiddentransactions: function () {
      var uniquevalues =  [...new Set(GlobalVariables.variables.$jtldata.map(item => item.label).filter((data) => data.startsWith('#')))];

      uniquevalues = this.$d3.sort(uniquevalues)

      return uniquevalues
    }


  }
}
</script>

