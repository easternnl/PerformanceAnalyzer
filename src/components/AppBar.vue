<template>
  <div class="row">
    <!-- main header with app names -->
    <div class="container-fluid px-3 py-2">
      <div class="d-flex flex-wrap align-items-center">
        <a href="http://www.eastern.nl/" class="d-flex align-items-center   text-white text-decoration-none">
          <img src="@/assets/apple-touch-icon.png" width="32" height="32" >
        </a>

        <ul class="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
          <li>
            <a href="#" class="nav-link text-black">
              JTL
            </a>
          </li>
          <li>
            <a href="#" class="nav-link text-secondary">
              NMON
            </a>
          </li>
          <li>
            <a href="#" class="nav-link text-secondary">
              Perfmon
            </a>
          </li>
          <li>
            <a href="#" class="nav-link text-secondary">
              Dashboards
            </a>
          </li>
          <li>
            <a href="#" class="nav-link text-secondary">
              Influx
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppBar"
}
</script>

