<script>
export default {
  name: "SidebarOpen.vue"
}
</script>

<template>
  <ul class="list-unstyled">
    <li class="mb-1">
      <button class="btn btn-toggle dropdown-toggle" data-bs-toggle="collapse" data-bs-target="#overview-collapse" aria-expanded="false">
        Open a file from
      </button>
      <div class="collapse show" id="overview-collapse">
        <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 ">
          <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary" >
            <div class="list-group list-group-flush scrollarea">
              <router-link to="/open/jenkins" class="list-group-item list-group-item-action py-3 lh-sm border-0">
                <div class="d-flex w-100 align-items-center justify-content-between">
                  <strong class="mb-1">Jenkins</strong>
                  <small></small>
                </div>
                <div class="col-10 mb-1 small">Download a file directly from Jenkins</div>
              </router-link>
              <router-link to="/open/upload" class="list-group-item list-group-item-action py-3 lh-sm border-0">
                <div class="d-flex w-100 align-items-center justify-content-between">
                  <strong class="mb-1">Upload a file</strong>
                  <small class="text-body-secondary"></small>
                </div>
                <div class="col-10 mb-1 small">Upload a file from your computer</div>
              </router-link>
              <router-link to="/open/webserver" class="list-group-item list-group-item-action py-3 lh-sm border-0">
                <div class="d-flex w-100 align-items-center justify-content-between">
                  <strong class="mb-1">Webserver</strong>
                  <small class="text-body-secondary"></small>
                </div>
                <div class="col-10 mb-1 small">Download a file from another webserver</div>
              </router-link>
            </div>
          </div>
        </ul>
      </div>
    </li>

    <li class="mb-1">
      <button class="btn btn-toggle dropdown-toggle" data-bs-toggle="collapse" data-bs-target="#examples" aria-expanded="false">
        Examples
      </button>
      <div class="collapse" id="examples">
        <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 ">
          <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary" >
            <div class="list-group list-group-flush scrollarea">
              <router-link class="list-group-item list-group-item-action py-3 lh-sm border-0" to="/jtloverviewhidden">
                <div class="d-flex w-100 align-items-center justify-content-between">
                  <strong class="mb-1">Small example</strong>
                </div>
                <div class="col-10 mb-1 small">Small example JTL file to review this tool.</div>
              </router-link>
              <router-link class="list-group-item list-group-item-action py-3 lh-sm border-0" to="/jtlbigcharthidden">
                <div class="d-flex w-100 align-items-center justify-content-between">
                  <strong class="mb-1">Big example</strong>
                </div>
                <div class="col-10 mb-1 small">Large example JTL file to review this tool.</div>
              </router-link>
              <router-link class="list-group-item list-group-item-action py-3 lh-sm border-0" to="/jtlbigcharthidden">
                <div class="d-flex w-100 align-items-center justify-content-between">
                  <strong class="mb-1">JTL file with some errors</strong>
                </div>
                <div class="col-10 mb-1 small">JTL file with some errors during the test.</div>
              </router-link>
            </div>

          </div>
        </ul>
      </div>
    </li>
  </ul>



</template>

<style scoped>

</style>