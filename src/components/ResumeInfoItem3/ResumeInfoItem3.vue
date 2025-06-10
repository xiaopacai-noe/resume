<template>
  <div style="display: flex; position: relative">
    <div :style="{ 'background-color': resumeStyle.themeColor, padding: '5px' }">{{ title }}</div>
    <div class="line" :style="{ 'background-color': resumeStyle.themeColor, position: 'absolute', bottom: 0 }"></div>
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useResumeStyleStore } from "@/store";
const resumeStyleStore = useResumeStyleStore();
const { resumeStyle } = storeToRefs(resumeStyleStore);
const { title } = defineProps(["title"]);
</script>
<style scoped lang="scss">
.line {
  height: 2px;
  flex: 1;
  width: 100%;
}
</style>
