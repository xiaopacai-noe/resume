<script setup>
import { nextTick } from "vue";
import Top from "./views/Top.vue";
const a = ref("123");
const hhh = () => {
  console.log("同步代码");
  setTimeout(() => {
    console.log("宏任务");
  });

  a.value += a.value;

  nextTick(() => {
    console.log("nextTick");
  });
    Promise.resolve(1).then(() => {
    console.log("Promise");
  });
};
</script>

<template>
  <div class="container">
    <button @click="hhh">测试{{ a }}</button>
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
