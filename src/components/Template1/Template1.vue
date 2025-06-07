<template>
  <div style="height: 100%; width: 100%; display: flex; flex-direction: column;position: relative;">
    <transition-group name="list">
      <div
        key="userInfo"
        class="info-item"
        :style="{ display: 'flex', 'justify-content': 'space-between', 'align-items': 'center', order: userInfoOrder }"
      >
        <div style="text-align: center; flex: 1">
          <h1 v-if="userInfo.fields[0].value">{{ userInfo.fields[0].value }}</h1>

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
          <div
            style="display: flex; justify-content: center"
            v-if="userInfo.fields[3].value || userInfo.fields[4].value"
          >
            <div v-if="userInfo.fields[1].value">
              {{ userInfo.fields[1].value }}<span v-if="userInfo.fields[4].value"> |&nbsp;</span>
            </div>
            <div v-if="userInfo.fields[2].value">{{ userInfo.fields[2].value }}</div>
          </div>
        </div>
        <n-avatar
          v-if="userInfo.fields[11].value"
          :size="100"
          :src="userInfo.fields[11].value"
          round
          style="cursor: pointer;position: absolute;right: 0"
        />
      </div>
      <div
        key="education_experience"
        :style="{ order: education_experienceOrder }"
        class="info-item"
        v-if="education_experience?.length"
      >
        <ResumeInfoItem title="教育背景"> </ResumeInfoItem>
        <div v-for="item in education_experience" class="education-item" :key="item.key">
          <div style="display: flex; justify-content: space-between">
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
          <div v-if="item.fields[4].value">专业成绩: {{ item.fields[4].value }}</div>
          <div v-if="item.fields[5].value">主修课程: {{ item.fields[5].value }}</div>
        </div>
      </div>
      <div
        key="work_experience"
        :style="{ order: work_experienceOrder }"
        class="info-item"
        v-if="work_experience?.length"
      >
        <ResumeInfoItem title="工作经历"> </ResumeInfoItem>
        <div v-for="item in work_experience" :key="item.key">
          <div style="display: flex; justify-content: space-between">
            <span
              ><span style="font-weight: bold">{{ item.fields[0].value }}</span> - {{ item.fields[1].value }}
              {{ item.fields[3].value }}</span
            >
            <span
              >{{ timestampToYearMonth(item.fields[2].value[0]) }} -
              {{ timestampToYearMonth(item.fields[2].value[1]) }}</span
            >
          </div>
          <div>使用技术栈:{{ item.fields[4].value }}</div>
          <div>工作描述:{{ item.fields[5].value }}</div>
        </div>
      </div>
      <div key="skill" :style="{ order: skillOrder }" class="info-item" v-if="skill?.fields?.length">
        <ResumeInfoItem title="技能清单"> </ResumeInfoItem>
        <div class="skill-item" v-for="item in skill.fields" :key="item.value">{{ item.value }}</div>
      </div>
      <div
        key="project_experience"
        :style="{ order: project_experienceOrder }"
        class="info-item"
        v-if="project_experience?.length"
      >
        <ResumeInfoItem title="项目经历"> </ResumeInfoItem>
        <div v-for="item in project_experience" :key="item.key">
          <div style="display: flex; justify-content: space-between">
            <span
              ><span style="font-weight: bold">{{ item.fields[0].value }}</span
              >-{{ item.fields[1].value }}</span
            >
            <span
              >{{ timestampToYearMonth(item.fields[2].value[0]) }} -
              {{ timestampToYearMonth(item.fields[2].value[1]) }}</span
            >
          </div>

          <div>项目链接:{{ item.fields[3].value }}</div>
          <div>项目地址:{{ item.fields[4].value }}</div>
          <div>技术栈: {{ item.fields[5].value }}</div>
          <div>项目描述: {{ item.fields[6].value }}</div>
        </div>
      </div>
      <div key="honors" :style="{ order: honorsOrder }" class="info-item" v-if="honors?.fields?.length">
        <ResumeInfoItem title="荣誉奖项"> </ResumeInfoItem>

        <div class="honor-item" v-for="item in honors.fields" :key="item.value">{{ item.value }}</div>
      </div>
      <div
        key="personal_summary"
        :style="{ order: personal_summaryOrder }"
        class="info-item"
        v-if="personal_summary?.fields?.length"
      >
        <ResumeInfoItem title="自我评价"> </ResumeInfoItem>
        <div>{{ personal_summary.fields[0].value }}</div>
      </div>
    </transition-group>
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useModuleThStore } from "@/store";
const userInfoOrder = ref(0);
const education_experienceOrder = ref(1);
const work_experienceOrder = ref(2);
const skillOrder = ref(3);
const project_experienceOrder = ref(4);
const honorsOrder = ref(5);
const personal_summaryOrder = ref(6);
const moduleThStore = useModuleThStore();
const { haveModules, enterIndex, haveModuleCount } = storeToRefs(moduleThStore);
watch(
  haveModules,
  async (newVal) => {
    userInfoOrder.value = newVal.findIndex((item) => item === "基本信息");
    education_experienceOrder.value = newVal.findIndex((item) => item === "教育经历");
    work_experienceOrder.value = newVal.findIndex((item) => item === "实习/工作经历");
    skillOrder.value = newVal.findIndex((item) => item === "技能清单");
    project_experienceOrder.value = newVal.findIndex((item) => item === "项目经历");
    honorsOrder.value = newVal.findIndex((item) => item === "荣誉奖项");
    personal_summaryOrder.value = newVal.findIndex((item) => item === "自我评价");



    const items = document.querySelectorAll(".info-item");
    items[enterIndex.value].scrollIntoView({ behavior: "smooth" });
  },
  { deep: true }
);
watch(haveModuleCount, () => {});
const props = defineProps(['allData']);
function timestampToYearMonth(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}
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
