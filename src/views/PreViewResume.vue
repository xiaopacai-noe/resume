<template>
  <div :style="computeResumeStyle" ref="previewResumeRef">
    <Template1 :allData></Template1>
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useResumeStyleStore } from "@/store";
const resumeStyleStore = useResumeStyleStore();
const { resumeStyle } = storeToRefs(resumeStyleStore);
const {allData} = defineProps(["allData"]);
const previewResumeRef = ref(null);
defineExpose({
  previewResumeRef,
});
const computeResumeStyle = computed(() => {
  return {
    fontSize: resumeStyle.value.fontSize + "px",
    fontFamily: resumeStyle.value.fontFamily,
    lineHeight: resumeStyle.value.lineHeight,
    padding: `${+resumeStyle.value.pagePadding}px ${+resumeStyle.value.pagePadding + 12}px`,
    width: "794px",
    height: "1123px",
    boxSizing: "border-box",
    border: "1px solid #ccc",
  };
});
</script>
<style scoped lang="scss"></style>
