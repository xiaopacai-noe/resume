<template>
  <div style="width: 100%; display: flex; align-items: center; background-color: aliceblue;position: relative;">
    <div
      :style="{ display: 'inline-block', width: '5px', 'background-color': resumeStyle.themeColor,'position':'absolute','top':0,'bottom':0 }"
    ></div>
    <div style="font-weight: bold; font-size: 1.3em;margin:8px">{{title}}</div>
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
