<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from "@/components/NavBar.vue";
import AppBar from "@/components/AppBar.vue";
import SideBar from "@/components/JTLSidebar.vue";

import Dashboard from "@/components/Dashboard.vue";




</script>

<template>

  <header>
    <AppBar></AppBar>

    <NavBar></NavBar>

  </header>

  <div>
    <div class="row mx-auto">

      <div class="col-3 overflow-auto vh-100" >
        <router-view class="sidebar" name="sidebar"></router-view>
      </div>
      <div class="col-9">

        <main>

          <router-view></router-view>
        </main>
      </div>


    </div>
  </div>

</template>


