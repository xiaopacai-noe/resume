<template>
  <div :style="computeResumeStyle" ref="previewResumeRef">
    <component :is="Template" :allData="allData" :ResumeInfoItemIndex="ResumeInfoItemIndex" />
  </div>
</template>

<script setup>
import Template1 from "@/components/Template1/Template1.vue";
import Template2 from "@/components/Template2/Template2.vue";
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { useResumeStyleStore } from "@/store";
const resumeStyleStore = useResumeStyleStore();
const { resumeStyle } = storeToRefs(resumeStyleStore);
const { allData, curResumeIndex } = defineProps(["allData", "curResumeIndex"]);
const previewResumeRef = ref(null);
defineExpose({ previewResumeRef });
const templateIndex = computed(() => curResumeIndex.split("-")[0]);
const ResumeInfoItemIndex = computed(() => curResumeIndex.split("-")[1]);
const templatesMap = {
  1: Template1,
  2: Template2,
};
const Template = computed(() => templatesMap[templateIndex.value] || Template1);
const computeResumeStyle = computed(() => ({
  fontSize: resumeStyle.value.fontSize + "px",
  fontFamily: resumeStyle.value.fontFamily,
  lineHeight: resumeStyle.value.lineHeight,
  padding: `${+resumeStyle.value.pagePadding}px ${+resumeStyle.value.pagePadding }px`,
  boxSizing: "border-box",
  position: "relative",
}));
</script>
