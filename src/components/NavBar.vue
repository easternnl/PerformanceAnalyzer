<template>
  <div class="row">
    <!-- secondary header with app specific buttons -->
    <div class="container-fluid d-flex flex-wrap px-3 py-2 border-bottom mb-3 bg-secondary">

      <router-link to="/open"><button type="button" class="btn me-2 text-white">Open</button></router-link>
      <button type="button" class="btn btn-primary text-white">Compare</button>

    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

