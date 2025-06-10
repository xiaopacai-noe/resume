<template>
  <div style="width: 100%">
    <div :style="{ marginBottom: '10px', fontWeight: 'bold', fontSize: '1.3em', color: resumeStyle.themeColor }">{{ title }}</div>
    <div :style="{ border: '1px solid ' + resumeStyle.themeColor, width: '100%', margin: '0 0 10px' }"></div>
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useResumeStyleStore } from "@/store";
const resumeStyleStore = useResumeStyleStore();
const { resumeStyle } = storeToRefs(resumeStyleStore);
const { title } = defineProps(["title"]);
</script>
<style scoped lang="scss"></style>
