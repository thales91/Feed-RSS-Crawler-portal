<template>
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
        <ul class="nav">
          <li class="nav-item ">
            
            <router-link to="/plataforma/twitter" class="nav-link">
              <i class="menu-icon mdi mdi-television"></i>
              <span class="menu-title">Configuração chaves</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/feeds" class="nav-link">
              <i class="menu-icon mdi mdi-content-copy"></i>
              <span class="menu-title">Feeds</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="posts" class="nav-link" href="pages/forms/basic_elements.html">
              <i class="menu-icon mdi mdi-backup-restore"></i>
              <span class="menu-title">Posts</span>
            </router-link>
          </li>
        </ul>
      </nav>
</template>

<script>
export default {
    name: 'Menu'
}
</script>

<style>
   #sidebar{
     padding-top: 60px;
     height: 100vh;
   }
</style>
