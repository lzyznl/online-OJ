<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh;">
      <a-layout-header class="header">
        <GlobalHeader/>
      </a-layout-header>
      <a-layout-content class="content"> 
        <router-view/>
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://github.com/lzyznl?tab=repositories">
          小刘的编程秘密基地-LZYOJ
        </a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup>
import BasicLayout from "@/Layout/BasicLayout";
import GlobalHeader from "@/components/GlobalHeader";
</script>

<style scoped>
#basicLayout {
}
#basicLayout .header {
  margin-bottom: 5px;
  box-shadow: #434242 1px 1px 5px;
}
#basicLayout .content {
  background: linear-gradient(to right,#fefefe,#fff);
  /* margin-bottom: 16px;
  padding: 20px; */
}
#basicLayout .footer {
  background-color: aqua;
  padding: 10px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  height: 40px;
  position: fixed;
}
</style>
