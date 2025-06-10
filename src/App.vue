<script setup>
import { nextTick } from "vue";
import Top from "./views/Top.vue";
</script>

<template>
  <div class="container">
    <n-message-provider>
      <n-dialog-provider>
        <Top />
      </n-dialog-provider>
      <router-view> </router-view>
    </n-message-provider>
  </div>
</template>

<style scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
