<template>
  <div class="card-container">
    <div class="card-title">
      <div style="display: flex; align-items: center">
        <slot name="card-title"></slot>
      </div>
    </div>
    <div class="card-content">
      <n-collapse :trigger-areas="['arrow', 'main']">
        <n-collapse-item name="1">
          <template #header>
            <div style="display: flex; width: 100%; justify-content: space-between">
              <div v-if="['技能清单', '荣誉奖项'].includes(title)">{{ data[0]?.value }}</div>
              <div v-else>
                {{ data[0]?.value }} <span v-if="data[1]?.value">| {{ data[1].value }}</span>
                <span v-if="data[2]?.value"> | {{ getTree(data[2].value) }}</span>
              </div>
            </div>
          </template>
          <template #header-extra>
            <n-icon
              size="20"
              style="float: right; margin-left: 10px; cursor: pointer"
              :component="Delete24Regular"
              v-if="titleKey !== 'userInfo'"
              @click="deleteItem()"
            >
            </n-icon>
          </template>
          <n-button type="success" dashed v-if="['荣誉奖项', '技能清单'].includes(title)" @click="addOne">
            添加
          </n-button>
          <div key="close" class="content" :style="{ 'grid-template-columns': data.length === 1 ? '1fr' : '1fr 1fr' }">
            <div v-for="(item, index) in data" :key="item.key" class="item">
              <div>{{ item.label }}</div>

              <n-input v-model:value="item.value" type="text" placeholder="基本的 Input" v-if="item.type === 'text'" />

              <div v-else-if="item.type === 'file'">
                <input
                  type="file"
                  ref="avatarRef"
                  accept="image/*"
                  style="display: none"
                  @change="(event) => handleFileChange(event, item)"
                />

                <!-- 点击头像触发上传 -->
                <n-avatar :size="100" :src="item.value" round @click="triggerUpload" style="cursor: pointer" />
              </div>

              <n-select v-model:value="item.value" :options="item.options" v-else-if="item.type === 'select'" />
              <n-date-picker v-model:value="item.value" type="monthrange" clearable v-else-if="item.type === 'date'" />
              <n-input v-model:value="item.value" type="number" v-else-if="item.type === 'number'" />

              <n-auto-complete
                v-model:value="item.value"
                :options="emailOptions"
                placeholder="邮箱"
                v-else-if="item.type === 'email'"
                :max="1"
              />
              <n-popover trigger="click" v-else-if="item.type === 'textarea'" placement="right">
                <template #trigger>
                  <n-input
                    v-model:value="item.value"
                    type="textarea"
                    @focus="popoverVisible = true"
                    @blur="popoverVisible = false"
                    :autosize="{ minRows: 2, maxRows: 5 }"
                  />
                </template>
                <div>
                  <n-button @click="openAiModal(index)" class="ai-button">AI润色 </n-button>
                </div>
              </n-popover>
              <n-modal v-model:show="AIModalVisible" @onAfterLeave="closeAIModal">
                <n-card :bordered="false" size="huge" role="dialog" aria-modal="true" style="width: 600px">
                  <template #header>
                    <svg
                      t="1749011053446"
                      :class="{ 'ai-icon': isRotateAIIcon }"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="8820"
                      width="20"
                      height="20"
                    >
                      <path
                        d="M143.146667 911.146667l-30.293334-30.293334a21.333333 21.333333 0 0 1 0-30.08L554.666667 408.96 615.04 469.333333 173.226667 911.146667a21.333333 21.333333 0 0 1-30.08 0z"
                        fill="#89695E"
                        p-id="8821"
                      ></path>
                      <path
                        d="M774.186667 219.52l30.293333 30.293333a21.333333 21.333333 0 0 1 0 30.08l-224 224-60.373333-60.373333 224-224a21.333333 21.333333 0 0 1 30.08 0z"
                        fill="#5D4037"
                        p-id="8822"
                      ></path>
                      <path
                        d="M768 64l40.746667 93.44 94.933333-37.12-37.12 94.933333L960 256l-93.44 40.746667 37.12 94.933333-94.933333-37.12L768 448l-40.746667-93.44-94.933333 37.12 37.12-94.933333L576 256l93.44-40.746667-37.12-94.933333 94.933333 37.12L768 64z"
                        fill="#FFC107"
                        p-id="8823"
                      ></path>
                      <path
                        d="M768 183.04l15.573333 35.413333 36.053334-14.08-14.08 36.053334 35.413333 15.573333-35.413333 15.573333 14.08 36.053334-36.053334-14.08-15.573333 35.413333-15.573333-35.413333-36.053334 14.08 14.08-36.053334-35.413333-15.573333 35.413333-15.573333-14.08-36.053334 36.053334 14.08 15.573333-35.413333z"
                        fill="#FFECB3"
                        p-id="8824"
                      ></path>
                    </svg>
                  </template>
                  <div v-if="!AITipContent">
                    <n-skeleton text style="width: 80%" />
                    <n-skeleton text style="width: 60%" />
                    <n-skeleton text style="width: 80%" />
                    <n-skeleton text style="width: 60%" />
                  </div>

                  <div v-else>{{ AITipContent }}</div>
                  <div v-if="!isRotateAIIcon" style="display: flex; justify-content: space-between; margin-top: 20px">
                    <n-button type="primary" @click="acceptAiTip(index)">运用</n-button>
                    <div style="display: flex; align-items: center; gap: 10px">
                      <n-input placeholder="可输入要求" v-model:value="requestToAI" type="text"></n-input>
                      <n-button type="info" @click="againRequest(index)">重新润色</n-button>
                    </div>
                  </div>
                </n-card>
              </n-modal>
            </div>
          </div>
        </n-collapse-item>
      </n-collapse>
    </div>
    <div
      v-if="isLast && ['教育经历', '实习/工作经历', '项目经历'].includes(title)"
      class="add-info"
      @click="handleAddInfo()"
    >
      + 添加一段{{ title }}
    </div>
  </div>
</template>
<script setup>
import Delete24Regular from "@vicons/fluent/Delete24Regular";
const emit = defineEmits(["handleAddInfo", "deleteItem", "addOne"]);
import { ref } from "vue";
const popoverVisible = ref(false);
const item = ref({ value: "" });
const avatarList = ref([
  {
    name: "image.png",
    url: "https://www.mocky.io/v2/5e4bafc63100007100d8b70f",
  },
]);
const { data, titleKey, title, isLast, index } = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
  titleKey: {
    type: String,
    default: () => "",
  },
  title: {
    type: String,
    default: () => "",
  },
  isLast: {
    type: Boolean,
    default: false,
  },
  index: {
    type: Number,
    default: 0,
  },
});
const emailValue = ref("");
const emailOptions = computed(() => {
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
      children: [emailValue.value.split("@")[0] + emailInfo[1]],
    };
  });
});
const deleteItem = () => {
  emit("deleteItem", index);
};
const isOpen = ref(false);

const handleAddInfo = () => {
  emit("handleAddInfo", title);
};
const avatarRef = ref(null);
const avatarUrl = ref("");

function triggerUpload() {
  avatarRef.value[0].click();
}

function handleFileChange(event, item) {
  const file = event.target.files[0];
  console.log("%c [ file ]-136", "font-size:13px; background:pink; color:#bf2c9f;", file);

  if (file) {
    item.value = URL.createObjectURL(file);
  }
}
const getTree = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => timestampToYearMonth(item)).join(" - ");
  } else {
    return value;
  }
};
function timestampToYearMonth(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}
const addOne = () => {
  emit("addOne", title);
};
const workerUrl = new URL("../utils/AI.js", import.meta.url);
const AIWork = new Worker("" + workerUrl, { type: "module" }); //new Worker的url相对路径是相对于当前页面URL的
const AITipContent = ref("");
const isRotateAIIcon = ref(false);
const requestToAI = ref("");
const systemPromptType =
  titleKey === "project_experience"
    ? "projectExperiencePrompt"
    : titleKey === "work_experience"
    ? "workExperiencePrompt"
    : "personalSummaryPrompt";
const againRequest = (index) => {
  isRotateAIIcon.value = true;
  let content = data[index].value + "要求:" + requestToAI.value;
  sendToAI(content, systemPromptType);
  AITipContent.value = "";
  requestToAI.value = "";
};
const acceptAiTip = (index) => {
  isRotateAIIcon.value = false;
  data[index].value = AITipContent.value;
  closeAIModal();
};
AIWork.onmessage = (e) => {
  if (e.data?.type === "end") {
    isRotateAIIcon.value = false;
    return;
  }
  AITipContent.value += e.data;
};
const AIModalVisible = ref(false);
const openAiModal = (index) => {
  AIModalVisible.value = true;
  if (AITipContent.value) return;
  sendToAI(data[index].value, systemPromptType);
  isRotateAIIcon.value = true;
  AITipContent.value = "";
  requestToAI.value = "";
  isRotateAIIcon.value = true;
};
const sendToAI = (content, systemPromptType) => {
  AIWork.postMessage({
    type: "getAI",
    data: {
      content,
      systemPromptType,
    },
  });
};
const closeAIModal = () => {
  isRotateAIIcon.value = false;
  // AITipContent.value = "";
  AIModalVisible.value = false;
};
</script>
<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.card-container {
  padding: 5px 10px;
  word-break: break-all;
}
.card-title {
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.open {
  transform: rotate(90deg);
  display: inline-block;
  font-size: 22px;
  margin-left: 10px;
  cursor: pointer;
}
.card-content {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 15px;
  font-size: 20px;
  container-type: inline-size;
  .header {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }
  .content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    @container (max-width:300px) {
      grid-template-columns: 1fr;
    }
  }
}
.add-info {
  border: 1px solid black;
  padding: 5px;
  width: fit-content;
  margin-top: 10px;
  border-radius: 10px;
  cursor: pointer;
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.ai-icon {
  margin-left: 10px;
  animation: rotate 0.5s ease-in-out infinite;
}
</style>
<style>
.n-modal-mask {
  background-color: transparent;
}
.n-modal {
  box-shadow: none;
}
</style>
