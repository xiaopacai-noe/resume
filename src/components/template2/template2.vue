<template>
  <div style="width: 100%; position: relative; display: flex">
    <!-- <div
      key="userInfo.key"
      class="info-item"
      :style="{ display: 'flex', 'justify-content': 'space-between', 'align-items': 'center', order: userInfoOrder }"
    >
      <div style="text-align: center; flex: 1">
        <div v-if="userInfo.fields[0].value" style="font-size: 1.5em; font-weight: bold">
          {{ userInfo.fields[0].value }}
        </div>

        <div
          style="display: flex; justify-content: center"
          v-if="userInfo.fields[9].value || userInfo.fields[5].value || userInfo.fields[10].value"
        >
          <div v-if="userInfo.fields[9].value">
            求职意向: {{ userInfo.fields[9].value
            }}<span v-if="userInfo.fields[5].value || userInfo.fields[10].value"> |&nbsp;</span>
          </div>
          <div v-if="userInfo.fields[5].value">
            {{ userInfo.fields[5].value }}<span v-if="userInfo.fields[10].value"> |&nbsp;</span>
          </div>
          <div v-if="userInfo.fields[10].value">{{ userInfo.fields[10].value }}</div>
        </div>
        <div
          style="display: flex; justify-content: center"
          v-if="
            userInfo.fields[1].value ||
            userInfo.fields[2].value ||
            userInfo.fields[8].value ||
            userInfo.fields[6].value ||
            userInfo.fields[7].value
          "
        >
          <div v-if="userInfo.fields[3].value">
            {{ userInfo.fields[3].value
            }}<span
              v-if="
                userInfo.fields[2].value ||
                userInfo.fields[8].value ||
                userInfo.fields[6].value ||
                userInfo.fields[7].value
              "
            >
              |&nbsp;</span
            >
          </div>
          <div v-if="userInfo.fields[4].value">
            {{ userInfo.fields[4].value
            }}<span v-if="userInfo.fields[8].value || userInfo.fields[6].value || userInfo.fields[7].value">
              |&nbsp;</span
            >
          </div>
          <div v-if="userInfo.fields[6].value">
            {{ userInfo.fields[6].value
            }}<span v-if="userInfo.fields[6].value || userInfo.fields[7].value"> |&nbsp;</span>
          </div>
          <div v-if="userInfo.fields[7].value">
            {{ userInfo.fields[7].value }}<span v-if="userInfo.fields[7].value"> |&nbsp;</span>
          </div>
          <div v-if="userInfo.fields[8].value">{{ userInfo.fields[8].value }}</div>
        </div>
        <div style="display: flex; justify-content: center" v-if="userInfo.fields[3].value || userInfo.fields[4].value">
          <div v-if="userInfo.fields[1].value">
            {{ userInfo.fields[1].value }}<span v-if="userInfo.fields[4].value"> |&nbsp;</span>
          </div>
          <div v-if="userInfo.fields[2].value">{{ userInfo.fields[2].value }}</div>
        </div>
      </div>
      <n-avatar v-if="userInfo.fields[11].value" :size="100" :src="userInfo.fields[11].value" round />
    </div> -->
    <Header2 :userInfo />
    <div style="display: flex; flex-direction: column">
      <transition-group name="list">
        <!-- 基本信息 -->

        <!-- 教育经历 -->
        <div
          key="education_experience"
          :style="{ order: education_experienceOrder }"
          class="info-item"
          v-if="education_experience?.length"
        >
          <component :is="ResumeInfoItem" title="教育背景" class="row"> </component>
          <div v-for="item in education_experience" class="education-item" :key="item.key">
            <div style="display: flex; justify-content: space-between" class="row">
              <span>
                <span v-if="item.fields[0].value" style="font-weight: bold">{{ item.fields[0].value }}</span>
                <span v-if="item.fields[1].value"> - {{ item.fields[1].value }}</span>
                <span
                  v-if="item.fields[3].value && ['985', '211', '双一流'].includes(item.fields[3].value)"
                  class="good-school"
                >
                  {{ item.fields[3].value }}
                </span>
              </span>
              <span v-if="item.fields[2].value && item.fields[2].value[0] && item.fields[2].value[1]">
                {{ timestampToYearMonth(item.fields[2].value[0]) }} -
                {{ timestampToYearMonth(item.fields[2].value[1]) }}
              </span>
            </div>
            <div v-if="item.fields[4].value" class="row">专业成绩: {{ item.fields[4].value }}</div>
            <div v-if="item.fields[5].value" class="row">主修课程: {{ item.fields[5].value }}</div>
          </div>
        </div>
        <!-- 项目经历 -->
        <div
          key="work_experience"
          :style="{ order: work_experienceOrder }"
          class="info-item"
          v-if="work_experience?.length"
        >
          <component :is="ResumeInfoItem" title="工作经历" class="row"> </component>
          <div v-for="item in work_experience" :key="item.key">
            <div style="display: flex; justify-content: space-between" class="row">
              <span
                ><span style="font-weight: bold">{{ item.fields[0].value }}</span> - {{ item.fields[1].value }}
                {{ item.fields[3].value }}</span
              >
              <span
                >{{ timestampToYearMonth(item.fields[2].value[0]) }} -
                {{ timestampToYearMonth(item.fields[2].value[1]) }}</span
              >
            </div>
            <div class="row">使用技术栈:{{ item.fields[4].value }}</div>
            <div class="row">工作描述:{{ item.fields[5].value }}</div>
          </div>
        </div>
        <!-- 实习/工作经历 -->
        <div key="skill" :style="{ order: skillOrder }" class="info-item" v-if="skill?.fields?.length">
          <component :is="ResumeInfoItem" title="技能清单" class="row"> </component>
          <template v-for="item in skill.fields" :key="item.value">
            <div class="skill-item row" v-if="item.value">{{ item.value }}</div>
          </template>
        </div>
        <!-- 技能清单 -->
        <div
          key="project_experience"
          :style="{ order: project_experienceOrder }"
          class="info-item"
          v-if="project_experience?.length"
        >
          <component :is="ResumeInfoItem" title="项目经历" class="row"> </component>

          <div v-for="item in project_experience" :key="item.key">
            <div style="display: flex; justify-content: space-between" class="row">
              <span
                ><span style="font-weight: bold">{{ item.fields[0].value }}</span
                >-{{ item.fields[1].value }}</span
              >
              <span
                >{{ timestampToYearMonth(item.fields[2].value[0]) }} -
                {{ timestampToYearMonth(item.fields[2].value[1]) }}</span
              >
            </div>

            <div class="row">项目链接:{{ item.fields[3].value }}</div>
            <div class="row">项目地址:{{ item.fields[4].value }}</div>
            <div class="row">技术栈: {{ item.fields[5].value }}</div>
            <div class="row">项目描述: {{ item.fields[6].value }}</div>
          </div>
        </div>
        <!-- 荣誉奖项 -->
        <div key="honors" :style="{ order: honorsOrder }" class="info-item" v-if="honors?.fields?.length">
          <component :is="ResumeInfoItem" title="荣誉奖项" class="row"> </component>
          <template v-for="item in honors.fields" :key="item.value">
            <div class="honor-item row" v-if="item.value">{{ item.value }}</div>
          </template>
        </div>
        <!-- 自我评价 -->
        <div
          key="personal_summary"
          :style="{ order: personal_summaryOrder }"
          class="info-item"
          v-if="personal_summary?.fields?.length"
        >
          <component :is="ResumeInfoItem" title="自我评价" class="row"> </component>
          <div class="row">{{ personal_summary.fields[0].value }}</div>
        </div>
      </transition-group>
    </div>
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useModuleThStore } from "@/store";
import { computed } from "vue";
import ResumeInfoItem1 from "../ResumeInfoItem1/ResumeInfoItem1.vue";
import ResumeInfoItem2 from "../ResumeInfoItem2/ResumeInfoItem2.vue";
import ResumeInfoItem3 from "../ResumeInfoItem3/ResumeInfoItem3.vue";
const moduleThStore = useModuleThStore();
const { haveModules, enterIndex, haveModuleCount } = storeToRefs(moduleThStore);

const userInfoOrder = computed(() => haveModules.value.findIndex((item) => item === "基本信息"));
const education_experienceOrder = computed(() => haveModules.value.findIndex((item) => item === "教育经历"));
const work_experienceOrder = computed(() => haveModules.value.findIndex((item) => item === "实习/工作经历"));
const skillOrder = computed(() => haveModules.value.findIndex((item) => item === "技能清单"));
const project_experienceOrder = computed(() => haveModules.value.findIndex((item) => item === "项目经历"));
const honorsOrder = computed(() => haveModules.value.findIndex((item) => item === "荣誉奖项"));
const personal_summaryOrder = computed(() => haveModules.value.findIndex((item) => item === "自我评价"));
watch(haveModuleCount, () => {});
const props = defineProps(["allData", "ResumeInfoItemIndex"]);
const ResumeInfotIemMap = {
  1: ResumeInfoItem1,
  2: ResumeInfoItem2,
  3: ResumeInfoItem3,
};
const ResumeInfoItem = computed(() => ResumeInfotIemMap[props.ResumeInfoItemIndex]);
function timestampToYearMonth(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}
//数据
const userInfo = computed(() => props.allData.find((item) => item.key === "userInfo"));
const education_experience = computed(() => props.allData.filter((item) => item.key.includes("education_experience")));
const work_experience = computed(() => props.allData.filter((item) => item.key.includes("work_experience")));
const project_experience = computed(() => props.allData.filter((item) => item.key.includes("project_experience")));
const skill = computed(() => props.allData.find((item) => item.key === "skill"));
const honors = computed(() => props.allData.find((item) => item.key === "honors"));
const personal_summary = computed(() => props.allData.find((item) => item.key === "personal_summary"));
</script>
<style scoped lang="scss">
div {
  margin-bottom: 10px;
  word-break: break-all;
}
.honor-item::before,
.skill-item::before {
  content: "• ";
  color: #000;
}
.good-school {
  color: #508cff;
  font-weight: bold;
  background: #e9f1ff;
  padding: 1px 4px;
  border-radius: 4px;
  margin-left: 10px;
  display: inline-block;
}
.list-move, /* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
}
</style>
