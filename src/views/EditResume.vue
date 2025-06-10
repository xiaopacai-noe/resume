<template>
  <div class="box" ref="boxRef">
    <div class="left" ref="leftRef">
      <n-color-picker @update:value="handleLeftBcChange" />
      <TransitionGroup name="list" tag="div">
        <Info
          v-for="(item, index) in allData"
          :title="item.title"
          :key="item.key"
          :titleKey="item.key"
          :icon="item.icon"
          :data="item.fields"
          :index="index"
          :isLast="
            ['教育经历', '实习/工作经历', '项目经历'].includes(item.title) &&
            allData.findLastIndex((i) => i.title === item.title) === index
          "
          :class="{ items: true }"
          @handleAddInfo="handleAddInfo"
          @deleteItem="deleteItem"
          @addOne="addOne"
        >
          <template #card-title v-if="index === allData.findIndex((i) => i.title === item.title)">
            <n-icon size="30">
              <component :is="item.icon" />
            </n-icon>
            <div class="title-text">{{ item.title }}</div>
          </template>
        </Info>
      </TransitionGroup>
      <a href="https://github.com/xiaopacai-noe/resume" target="_blank" rel="noopener noreferrer" style="float: right;margin-right:10px;">
        <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/xiaopacai-noe/resume" />
      </a>
    </div>
    <!-- <div class="resize" ref="resizeRef">
      <n-divider dashed :vertical="true" style="height: 100%"> 虚线 </n-divider>
    </div> -->
    <div class="right" ref="rightRef">
      <PreViewResume ref="resumeRef" :allData :curResumeIndex />
    </div>

    <Teleport to="#template-export">
      <n-dropdown trigger="hover" :options="downloadOptions" @select="handleSelectdownload">
        <n-button>导出</n-button>
      </n-dropdown>
    </Teleport>
    <Teleport to="#template-select">
      <n-dropdown trigger="hover" :options="templateOptions" @select="handleSelectTemplate">
        <n-button>模板选择</n-button>
      </n-dropdown>
    </Teleport>
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useModuleThStore } from "@/store";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
let curResumeIndex = ref(route.path.split("/").pop());
const moduleThStore = useModuleThStore();
const { haveModules, enterIndex, haveModuleCount } = storeToRefs(moduleThStore);
import PreViewResume from "./PreViewResume.vue";
import { useResumeStyleStore } from "@/store";
const resumeStyleStore = useResumeStyleStore();
const { resumeStyle } = storeToRefs(resumeStyleStore);
const value = ref("");
const resumeRef = ref();
const downloadOptions = ref([{ label: "PDF (A4)", key: "pdf" }]);
import html2pdf from "html2pdf.js";
const handleSelectdownload = (value) => {
  //todo: 实现下载功能
  if (value === "pdf") {
    html2pdf()
      .set({
        margin: 0,
        filename: "简历.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 4 }, // 提高清晰度
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: "avoid-all" },
      })
      .from(resumeRef.value.$el)
      .save();
    //pdf
  } else {
    //word
  }
};
const options1 = [
  {
    label: "Everybody's Got Something to Hide Except Me and My Monkey",
    value: "song0",
    disabled: true,
  },
  {
    label: "Drive My Car",
    value: "song1",
  },
  {
    label: "Norwegian Wood",
    value: "song2",
  },
  {
    label: "You Won't See",
    value: "song3",
    disabled: true,
  },
  {
    label: "Nowhere Man",
    value: "song4",
  },
  {
    label: "Think For Yourself",
    value: "song5",
  },
  {
    label: "The Word",
    value: "song6",
  },
  {
    label: "Michelle",
    value: "song7",
    disabled: true,
  },
  {
    label: "What goes on",
    value: "song8",
  },
  {
    label: "Girl",
    value: "song9",
  },
  {
    label: "I'm looking through you",
    value: "song10",
  },
  {
    label: "In My Life",
    value: "song11",
  },
  {
    label: "Wait",
    value: "song12",
  },
];
const options = computed(() => {
  return [
    ["QQ邮箱", "@qq.com"],
    ["163邮箱", "@163.com"],
    ["谷歌", "@gmail.com"],
    ["Outlook", "@outlook.com"],
    ["网易", "@163.com"],
  ].map((emailInfo) => {
    return {
      type: "group",
      label: emailInfo[0],
      key: emailInfo[0],
      children: [value.value.split("@")[0] + emailInfo[1]],
    };
  });
});
const templateOptions = [
  { label: "单栏模板1", key: "1-1" },
  { label: "单栏模板2", key: "1-2" },
  { label: "单栏模板3", key: "1-3" },
  { label: "双栏模板1", key: "2-1" },
  { label: "双栏模板2", key: "2-2" },
  { label: "双栏模板3", key: "2-3" },
];
const handleSelectTemplate = (value) => {
  curResumeIndex.value = value;
  router.push(`/edit/${value}`);
};
const isDrag = ref(false);
const boxRef = ref();
const leftRef = ref();
const resizeRef = ref();
const rightRef = ref();
const handleResize = () => {
  const resizeDom = resizeRef.value;
  resizeDom.addEventListener("mousedown", (e) => mousedown(e));
};
const originAllData = [
  {
    key: "userInfo",
    title: "基本信息",
    icon: "CalendarPerson16Regular",
    fields: [
      { key: "name", label: "姓名", value: "大帅哥", type: "text" },
      { key: "phone", label: "联系电话", value: "153xxxx8888", type: "text" },
      { key: "email", label: "邮箱", value: "zhangsan@example.com", type: "email" },
      { key: "age", label: "年龄", value: "22", type: "number" },
      {
        key: "sex",
        label: "性别",
        value: "男",
        type: "select",
        options: [
          { label: "男", value: "男" },
          { label: "女", value: "女" },
        ],
      },
      { key: "current_address", label: "现居地址", value: "北京市海淀区", type: "text" },
      { key: "person_website", label: "个人网站", value: "https://zhangsan.dev", type: "text" },
      { key: "nationality", label: "民族", value: "汉族", type: "text" },
      {
        key: "political_status",
        label: "政治面貌",
        value: "中共党员",
        type: "select",
        options: [
          { label: "中共党员", value: "中共党员" },
          { label: "中共预备党员", value: "中共预备党员" },
          { label: "共青团员", value: "共青团员" },
          { label: "民主党派", value: "民主党派" },
          { label: "无党派人士", value: "无党派人士" },
          { label: "群众", value: "群众" },
        ],
      },
      { key: "job_intention", label: "求职意向", value: "前端开发工程师", type: "text" },
      {
        key: "salary_expectation",
        label: "期望薪资",
        value: "10k",
        type: "text",
      },
      { key: "photo", label: "照片", value: "", type: "file" },
    ],
  },
  {
    key: "education_experience",
    title: "教育经历",
    icon: "Education",
    fields: [
      { key: "school_name", label: "学校名称", value: "清华大学", type: "text" },
      { key: "major", label: "专业", value: "软件工程", type: "text" },
      { key: "study_time", label: "就读时间", value: [1874937600000, 1888156800000], type: "date" },

      {
        key: "school_type",
        label: "学校类型",
        value: "985",
        type: "select",
        options: [
          { label: "985", value: "985" },
          { label: "211", value: "211" },
          { label: "双一流", value: "双一流" },
          { label: "其他", value: "其他" },
        ],
      },

      { key: "GPA", label: "GPA", value: "3.85 / 4.0", type: "text" },
      {
        key: "related_courses",
        label: "相关课程",
        value: "计算机组成原理、数据结构、操作系统、计算机网络",
        type: "text",
      },
    ],
  },
  {
    key: "work_experience",
    title: "实习/工作经历",
    icon: "WorkOutlineFilled",
    fields: [
      { key: "corporate_name", label: "公司名称", value: "字节跳动", type: "text" },
      { key: "title", label: "职位名称", value: "web前端开发实习生", type: "text" },
      { key: "work_time", label: "工作时间", value: [1874937600000, 1888156800000], type: "date" },
      { key: "department", label: "所属部门", value: "产研部", type: "text" },
      { key: "tech_stack", label: "使用技术栈", value: "Vue、React...", type: "text" },
      {
        key: "description",
        label: "工作描述",
        value:
          "参与字节跳动 Web 产品开发，使用 Vue/React 实现高质量前端页面,优化页面性能，解决兼容性问题，提升用户体验",
        type: "textarea",
        AITip: "",
      },
    ],
  },
  {
    key: "skill",
    title: "技能清单",
    icon: "Tool",
    fields: [
      {
        key: "skills",
        label: "技能",
        value:
          "熟练掌握 HTML/CSS/JavaScript,熟悉 Vue.js 与 React,了解 Node.js 与前后端联调,掌握 Git 版本控制,了解 Web 性能优化与浏览器渲染原理",
        type: "text",
      },
    ],
  },
  {
    key: "project_experience",
    title: "项目经历",
    icon: "Code",
    fields: [
      { key: "project_name", label: "项目名称", value: "个人博客系统", type: "text" },
      { key: "project_role", label: "项目角色", value: "前端开发工程师", type: "text" },
      { key: "project_duration", label: "项目周期", value: [1874937600000, 1888156800000], type: "date" },
      { key: "project_address", label: "项目地址", value: "https://example.com/personal-blog", type: "text" },
      { key: "project_link", label: "项目链接", value: "https://example.com/personal-blog", type: "text" },
      {
        key: "project_technologies",
        label: "技术栈",
        value: "Vue.js,Vuex,Axios,Element UI",
        type: "text",
      },
      {
        key: "project_description",
        label: "项目描述",
        value: "一个基于 Vue.js 的个人博客系统",
        type: "textarea",
        AITip: "",
      },
    ],
  },
  {
    key: "honors",
    title: "荣誉奖项",
    icon: "Award",
    fields: [
      {
        key: "honors",
        label: "奖项列表",
        value: "2023 年校级优秀学生,2024 年国家励志奖学金,2025 年省级编程竞赛一等奖",
        type: "text",
      },
    ],
  },
  {
    key: "personal_summary",
    title: "自我评价",
    icon: "Autosum20Regular",
    fields: [
      {
        key: "content",
        label: "内容",
        value: "热爱前端开发，具备良好的自学能力和团队协作意识，乐于接受新技术和挑战，愿在前端技术方向持续深入发展。",
        type: "textarea",
        AITip: "",
      },
    ],
  },
];
const allData = localStorage.getItem("resumeData")
  ? ref(JSON.parse(localStorage.getItem("resumeData")))
  : ref(originAllData);
provide("allData", allData);
watch(
  haveModules,
  async (newVal, oldVal) => {
    allData.value.sort(
      (a, b) => newVal.findIndex((item) => a.title === item) - newVal.findIndex((item) => b.title === item)
    );
    await nextTick();
    const items = document.querySelectorAll(".items");
    let scrollTop;
    items.forEach((item, i) => {
      if (item.textContent.includes(newVal[enterIndex.value])) {
        scrollTop = item.offsetTop;
      }
    });

    leftRef.value.scrollTop = scrollTop;
  },
  { deep: true }
);
watch(haveModuleCount, (newVal, oldVal) => {
  if (newVal > oldVal) {
    let addModuleName = haveModules.value[newVal - 1];
    let addData = originAllData.find((item) => item.title === addModuleName);
    allData.value.push(addData);
    setTimeout(() => {
      leftRef.value.scrollTop = leftRef.value.scrollHeight;
    });
  } else {
    let lastScrollTop = leftRef.value.scrollTop;
    allData.value = allData.value.filter((item) => haveModules.value.includes(item.title));
    setTimeout(() => {
      leftRef.value.scrollTop = lastScrollTop;
    });
  }
});

const mousedown = (e, leftMinWidth = 200, rightMinWidth = 200) => {
  const leftDom = leftRef.value,
    rightDom = rightRef.value;
  let LeftStartWidth = leftDom.getBoundingClientRect().width;
  let RightStartWidth = rightDom.getBoundingClientRect().width;
  const startX = e.clientX;
  document.onmousemove = (e) => {
    disableSelect();
    const offWidth = e.clientX - startX;
    let leftWidth = Math.max(leftMinWidth, LeftStartWidth + offWidth);
    let rightWidth = Math.max(rightMinWidth, RightStartWidth - offWidth);
    leftDom.style.width = leftWidth + "px";
    rightDom.style.width = rightWidth + "px";
  };
  document.onmouseup = (e) => {
    enableSelect();
    document.onmousemove = null;
    document.onmouseup = null;
  };
};
const disableSelect = () => {
  document.body.style.userSelect = "none";
};
const enableSelect = () => {
  document.body.style.userSelect = "";
};
const screenResize = () => {
  if (isDrag.value) return;
  const boxDom = boxRef.value;
  const leftDom = leftRef.value;
  const rightDom = rightRef.value;
  const totalWidth = boxDom.getBoundingClientRect().width;
  const leftWidth = leftDom.getBoundingClientRect().width;
  const rightWidth = rightDom.getBoundingClientRect().width;
  const leftRate = leftWidth / totalWidth;
  leftDom.style.width = leftWidth + totalWidth / (1 - leftRate) + "px";
  rightDom.style.width = rightWidth + totalWidth / leftRate + "px";
};
const sideItem = () => {
  const items = document.querySelectorAll(".items");
  items.forEach((item, index) => {
    setTimeout(() => {
      item.style.transition = `transform ${index * 0.1}s cubic-bezier(0.4, 0, 1, 1)`;
      item.style.transform = "translateX(0) ";
      item.style.opacity = "1";
    });
  });
};
const inputChange = (val, titleKey, key) => {
  allData.value.filter((item) => item.key === titleKey).fields.filter((field) => field.key === key).value = val;
};
import { useMessage } from "naive-ui";
import { watch } from "vue";
import { onMounted } from "vue";
import { onBeforeMount } from "vue";
const message = useMessage();
function handleKeyDown(event) {
  // 判断是否按下了 Ctrl + S
  if ((event.ctrlKey || event.metaKey) && event.key === "s") {
    event.preventDefault();
    localStorage.setItem("resumeData", JSON.stringify(allData.value));
    message.success("保存成功");
  }
}

onMounted(() => {
  // handleResize();
  // window.addEventListener("resize", screenResize);
  // sideItem(); 为啥添加初始动画 ，transitionGroup组件不生效了
  window.addEventListener("keydown", handleKeyDown);
  let ResumeIndex = localStorage.getItem("ResumeIndex") || 0;
  if (!ResumeIndex) {
    localStorage.setItem("ResumeIndex", ResumeIndex);
  }
});
onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeyDown);
  localStorage.setItem("resumeData", JSON.stringify(allData.value));
});
// 保存数据
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    localStorage.setItem("resumeData", JSON.stringify(allData.value));
  }
});
// 保存数据
window.addEventListener("beforeunload", (e) => {
  console.log("%c [ beforeunload ]-456", "font-size:13px; background:pink; color:#bf2c9f;", beforeunload);
  localStorage.setItem("resumeData", JSON.stringify(allData.value));
});
const handleLeftBcChange = (value) => {
  leftRef.value.style.backgroundColor = value;
};
const handleAddInfo = async (value) => {
  let lastIndex;
  if (value === "教育经历") {
    lastIndex = allData.value.findLastIndex((item) => item.key.includes("education_experience"));
    allData.value.splice(lastIndex + 1, 0, {
      key: `education_experience${new Date()}`,
      title: "教育经历",
      icon: "Education",
      fields: [
        { key: "school_name", label: "学校名称", value: "清华大学", type: "text" },
        { key: "major", label: "专业", value: "软件工程", type: "text" },
        { key: "study_time", label: "就读时间", value: [1874937600000, 1888156800000], type: "date" },

        {
          key: "school_type",
          label: "学校类型",
          value: "985",
          type: "select",
          options: [
            { label: "985", value: "985" },
            { label: "211", value: "211" },
            { label: "双一流", value: "双一流" },
            { label: "其他", value: "其他" },
          ],
        },

        { key: "GPA", label: "GPA", value: "3.85 / 4.0", type: "text" },
        {
          key: "related_courses",
          label: "相关课程",
          value: "计算机组成原理、数据结构、操作系统、计算机网络",
          type: "text",
        },
      ],
    });
  } else if (value === "实习/工作经历") {
    lastIndex = allData.value.findLastIndex((item) => item.key.includes("work_experience"));
    allData.value.splice(lastIndex + 1, 0, {
      key: `work_experience${new Date()}`,
      title: "实习/工作经历",
      icon: "WorkOutlineFilled",
      fields: [
        { key: "corporate_name", label: "公司名称", value: "字节跳动", type: "text" },
        { key: "title", label: "职位名称", value: "web前端开发实习生", type: "text" },
        { key: "work_time", label: "工作时间", value: [1874937600000, 1888156800000], type: "date" },
        { key: "department", label: "所属部门", value: "产研部", type: "text" },
        { key: "tech_stack", label: "使用技术栈", value: "Vue、React...", type: "text" },
        {
          key: "description",
          label: "工作描述",
          value:
            "参与字节跳动 Web 产品开发，使用 Vue/React 实现高质量前端页面,优化页面性能，解决兼容性问题，提升用户体验",
          type: "textarea",
          AITip: "",
        },
      ],
    });
  } else {
    lastIndex = allData.value.findLastIndex((item) => item.key.includes("project_experience"));
    allData.value.splice(lastIndex + 1, 0, {
      key: `project_experience${new Date()}`,
      title: "项目经历",
      icon: "Code",
      fields: [
        { key: "project_name", label: "项目名称", value: "个人博客系统", type: "text" },
        { key: "project_role", label: "项目角色", value: "前端开发工程师", type: "text" },
        { key: "project_duration", label: "项目周期", value: [1874937600000, 1888156800000], type: "date" },
        { key: "project_address", label: "项目地址", value: "https://example.com/personal-blog", type: "text" },
        { key: "project_link", label: "项目链接", value: "https://example.com/personal-blog", type: "text" },
        {
          key: "project_technologies",
          label: "技术栈",
          value: "Vue.js,Vuex,Axios,Element UI",
          type: "text",
        },
        {
          key: "project_description",
          label: "项目描述",
          value: "一个基于 Vue.js 的个人博客系统",
          type: "textarea",
          AITip: "",
        },
      ],
    });
  }
  await nextTick();
  const slideHeight =
    document.querySelector(".card-content").getBoundingClientRect().height +
    document.querySelector(".title-text").getBoundingClientRect().height +
    10;
  leftRef.value.scrollTop = leftRef.value.scrollTop + slideHeight;
};
const deleteItem = (index) => {
  let delModuleName = allData.value.splice(index, 1)[0];
  if (allData.value.some((i) => i.title === delModuleName.title)) return;
  moduleThStore.deleteModule(delModuleName.title);
};
const addOne = (title) => {
  if (title === "技能清单") {
    let a = allData.value.filter((i) => i.title === title);
    allData.value
      .filter((i) => i.title === title)[0]
      .fields.push({
        key: "skills",
        label: "技能",
        value: "",
        type: "text",
      });
  } else {
    allData.value
      .filter((i) => i.title === title)[0]
      .fields.push({
        key: "honors",
        label: "奖项列表",
        value: "2023 年校级优秀学生,2024 年国家励志奖学金,2025 年省级编程竞赛一等奖",
        type: "text",
      });
  }
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
.box {
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
}
.left {
  position: relative;
  flex: 1;
  background-color: #f1eab3;
  border: 1px solid rgba(255, 255, 255, 0.1);
  height: calc(100% - 10px);
  border-radius: 8px;
  margin: 5px 0 5px 5px;
  overflow: auto;
  scrollbar-width: none;
  scroll-behavior: smooth;
}
.resize {
  cursor: col-resize;
  &:hover {
    background-color: #45a3ff;
  }
}
.right {
  // border-radius: 10px;
  width: 820px;
  // background-color: #ecf0e9;
  // border: 1px solid rgba(255, 255, 255, 0.1);
  height: calc(100% - 10px);
  margin: 5px 5px 5px 0;
  overflow: auto;
  scrollbar-width: none;
  display: flex;
  justify-content: center;
  box-shadow: 0 1px 3px 1px #3c404326;
  margin-left: 10px;
}
.title-text {
  font-weight: bold;
  font-size: 24px;
  margin-left: 10px;
}
.info-item {
  // transform: translate(-100%);
}
</style>
<style>
.left .n-color-picker-trigger__value {
  color: transparent !important;
}
.left .n-color-picker {
  width: 50px;
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 1000;
}
</style>
