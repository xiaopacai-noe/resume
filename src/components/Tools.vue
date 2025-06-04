<template>
  <div class="tools-container">
    <n-tooltip placement="bottom" trigger="hover">
      <template #trigger>
        <n-select
          v-model:value="fontSizeValue"
          filterable
          placeholder="字体大小"
          :options="fontSizeOptions"
          @update:value="handleStyleChange"
        >
        </n-select>
      </template>
      <span>字体大小</span>
    </n-tooltip>
    <n-tooltip>
      <template #trigger>
        <n-select
          v-model:value="fontFamilyValue"
          filterable
          placeholder="字体类型"
          :options="fontFamilyOptions"
          @update:value="handleStyleChange"
        />
      </template>
      <span>字体类型</span>
    </n-tooltip>
    <n-tooltip>
      <template #trigger>
        <n-select
          v-model:value="lineHeightValue"
          filterable
          placeholder="行距"
          :options="lineHeightOptions"
          @update:value="handleStyleChange"
        >
          <template #arrow>
            <span style="position: relative; right: 5px">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 8l3-3l3 3"></path>
                  <path d="M3 16l3 3l3-3"></path>
                  <path d="M6 5v14"></path>
                  <path d="M13 6h7"></path>
                  <path d="M13 12h7"></path>
                  <path d="M13 18h7"></path>
                </g>
              </svg>
            </span>
          </template>
        </n-select>
      </template>
      <span>行距</span>
    </n-tooltip>
    <n-tooltip>
      <template #trigger
        ><n-select
          v-model:value="marginValue"
          filterable
          placeholder="页边距"
          :options="marginOptions"
          @update:value="handleStyleChange"
        >
          <template #arrow>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20">
              <g fill="none">
                <path
                  d="M6.5 13a.5.5 0 0 1-.5-.5v-5a.5.5 0 0 1 1 0v5a.5.5 0 0 1-.5.5zm7 0a.5.5 0 0 1-.5-.5v-5a.5.5 0 0 1 1 0v5a.5.5 0 0 1-.5.5zM4 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4zm3-1v2.5a.5.5 0 0 1-1 0V3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1v-2.5a.5.5 0 0 1 1 0V17h6v-2.5a.5.5 0 0 1 1 0V17a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1v2.5a.5.5 0 0 1-1 0V3H7z"
                  fill="currentColor"
                ></path>
              </g>
            </svg>
          </template>
        </n-select>
      </template>
      <span>页边距</span>
    </n-tooltip>
    <n-tooltip>
      <template #trigger>
        <n-color-picker style="width: 50px" @update:value="handleStyleChange" v-model:value="themeColorValue" />
      </template>
      <span>简历主题色</span>
    </n-tooltip>
    <n-popover placement="bottom" trigger="click">
      <template #trigger>
        <n-button>模块管理</n-button>
      </template>
      <div class="add-content" @dragstart="handleDragStart" @dragover="handleDragOver">
        <span style="font-weight: bold">已添加模块</span>
        <TransitionGroup name="list" tag="div">
          <div
            class="module-item"
            v-for="(item, index) in haveModules"
            :key="item"
            draggable="true"
            :data-index="index"
          >
            {{ item }}
          </div>
        </TransitionGroup>
      </div>
      <div class="no-content" @click="addModule($event.target.textContent.replace('+', '').trim())">
        <span style="font-weight: bold">可添加模块</span>
        <div class="module-item" v-for="item in noModules" :key="item">{{ item }} <span>+</span></div>
      </div>
    </n-popover>

  </div>
</template>
<script setup>
import { ref } from "vue";
import {storeToRefs} from "pinia";
import { useResumeStyleStore, useModuleThStore } from "@/store";
const moduleThStore = useModuleThStore();
const {haveModules, noModules} = storeToRefs(moduleThStore);
const resumeStyleStore = useResumeStyleStore();

const fontSizeValue = ref(resumeStyleStore.resumeStyle.fontSize);
const fontSizeOptions = ref([
  { label: "12px", value: "12" },
  { label: "14px", value: "14" },
  { label: "16px", value: "16" },
  { label: "18px", value: "18" },
  { label: "20px", value: "20" },
  { label: "22px", value: "22" },
]);
const fontFamilyValue = ref(resumeStyleStore.resumeStyle.fontFamily);
const fontFamilyOptions = ref([
  { label: "宋体", value: "SimSun" },
  { label: "新宋体", value: "NSimSun" },
  { label: "仿宋", value: "FangSong" },
  { label: "黑体", value: "SimHei" },
  { label: "楷体", value: "KaiTi" },
  { label: "微软雅黑", value: "Microsoft YaHei" },
]);
const lineHeightValue = ref(resumeStyleStore.resumeStyle.lineHeight);
const lineHeightOptions = ref([
  { label: "1.0", value: "1.0" },
  { label: "1.5", value: "1.5" },
  { label: "2.0", value: "2.0" },
]);
const marginValue = ref(resumeStyleStore.resumeStyle.pagePadding);
const marginOptions = ref([
  { label: "10px", value: "10" },
  { label: "20px", value: "20" },
  { label: "30px", value: "30" },
  { label: "40px", value: "40" },
  { label: "50px", value: "50" },
  { label: "60px", value: "60" },
  { label: "70px", value: "70" },
]);
const themeColorValue = ref(resumeStyleStore.resumeStyle.themeColor);
const handleStyleChange = () => {
  resumeStyleStore.setResumeStyle({
    fontSize: fontSizeValue.value,
    fontFamily: fontFamilyValue.value,
    lineHeight: lineHeightValue.value,
    pagePadding: marginValue.value,
    themeColor: themeColorValue.value,
  });
};
const dragStartIndex = ref(-1);
const dragStartDom = ref(null);
const dragEnterIndex = ref(-1);
const dragEnterDom = ref(null);
const handleDragStart = (e) => {
  dragStartDom.value = e.target;
  dragStartIndex.value = +e.target.dataset.index;
};
const handleDragOver = (e) => {
  if (e.target.className !== "module-item") return;
  dragEnterDom.value = e.target;
  if (dragStartDom.value === dragEnterDom.value) return;

  dragEnterIndex.value = +dragEnterDom.value.dataset.index;
  if (dragStartIndex.value !== dragEnterIndex.value) {
    moduleThStore.moveModule(dragStartIndex.value, dragEnterIndex.value);
  }
  dragStartDom.value = dragEnterDom.value;
  dragStartIndex.value = +dragEnterIndex.value;
};
const addModule = (moduleName) => {
  moduleThStore.addModule(moduleName);
};
</script>
<style scoped lang="scss">
/* 进入动画 */
.list-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.list-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.list-enter-active {
  transition: all 0.5s ease;
}

/* 离开动画 */
.list-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.list-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}
.list-leave-active {
  transition: all 0.5s ease;
}

/* 移动动画 */
.list-move {
  transition: transform 0.5s;
}
.tools-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}
svg {
  height: 20px;
}
.module-item {
  display: flex;
  justify-content: space-between;
  width: 150px;
  padding: 5px 10px;
  cursor: move;
  user-select: none;
  &:hover {
    background-color: #f0f0f0;
  }
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
}
.no-content {
  margin: 20px 0 10px;
  .module-item {
    cursor: pointer;
  }
}
</style>
<style>
.tools-container {
  svg {
    color: black;
    font-size: 1em;
  }
  .n-color-picker-trigger__value {
    color: transparent !important;
  }
  .n-select {
    width: 100px;
  }
}
</style>
