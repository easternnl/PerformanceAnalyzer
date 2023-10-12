<template>
  <div class="row mx-auto">
    <!-- secondary header with app specific buttons -->
    <div class="border-bottom mb-3 bg-secondary px-2 py-2">

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

