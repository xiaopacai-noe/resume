<template>
  <div class="top">
    <n-dropdown size="huge" trigger="hover" :options="options" @select="handleSelect" v-if="isCloseMenu">
      <svg
        class="close-menu"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 24 24"
      >
        <path
          d="M8.1 13.34l2.83-2.83L3.91 3.5a4.008 4.008 0 0 0 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38c1.91-1.91 2.28-4.65.81-6.12c-1.46-1.46-4.2-1.1-6.12.81c-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88l1.41-1.41L13.41 13l1.47-1.47z"
          fill="currentColor"
        ></path>
      </svg>
    </n-dropdown>
    <div class="open-menu" v-if="!isCloseMenu">
      <div class="item" v-for="item in menuItems" :key="item.key" @click="handleSelect(item.key)">
        <svg :xmlns="item.svgNs" :viewBox="item.viewBox" class="menu-icon">
          <g
            :fill="item.fill || 'currentColor'"
            :stroke="item.stroke"
            :stroke-width="item.strokeWidth"
            :stroke-linecap="item.strokeLinecap"
            :stroke-linejoin="item.strokeLinejoin"
          >
            <path :d="item.path" />
          </g>
        </svg>
        <span class="menu-text">{{ item.label }}</span>
      </div>
    </div>
    <Tools v-else style="margin-left: auto" />
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const value = ref("");
const menuItems = ref([
 
  {
    key: "template",
    label: "简历模版",
    svgNs: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    path: "M2 4.5A2.5 2.5 0 0 1 4.5 2h9A2.5 2.5 0 0 1 16 4.5v3.535A3.53 3.53 0 0 0 15.5 8H15V4.5A1.5 1.5 0 0 0 13.5 3h-9A1.5 1.5 0 0 0 3 4.5v9A1.5 1.5 0 0 0 4.5 15H6v.5c0 .17.012.337.035.5H4.5A2.5 2.5 0 0 1 2 13.5v-9zm11 3a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5zm-8-2a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm2 6A2.5 2.5 0 0 1 9.5 9h6a2.5 2.5 0 0 1 2.5 2.5v4a2.5 2.5 0 0 1-2.5 2.5h-6A2.5 2.5 0 0 1 7 15.5v-4zM9.5 10a1.5 1.5 0 0 0-1.476 1.231l4.476 2.686l4.476-2.686A1.5 1.5 0 0 0 15.5 10h-6zM8 15.5A1.5 1.5 0 0 0 9.5 17h6a1.5 1.5 0 0 0 1.5-1.5v-3.117l-4.243 2.546a.5.5 0 0 1-.514 0L8 12.383V15.5z",
  },
  {
    key: "ai",
    label: "AI润色",
    svgNs: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    path: "M11 24h10v2H11zM13 28h6v2h-6zM10.815 18.14A7.185 7.185 0 0 1 8 12a8.01 8.01 0 0 1 8-8V2A10.011 10.011 0 0 0 6 12a9.18 9.18 0 0 0 3.46 7.616C10.472 20.551 11 21.081 11 22h2c0-1.84-1.11-2.866-2.185-3.86zM21 9.59L17.41 6L16 7.41l5 5l9-9L28.59 2L21 9.59zM23.8 14a7.28 7.28 0 0 1-2.622 4.143C20.107 19.135 19 20.16 19 22h2c0-.92.526-1.45 1.535-2.386A9.143 9.143 0 0 0 25.84 14z",
  },
]);

const options = ref([
  { label: "简历模版", key: "template" },
  { label: "AI润色", key: "ai" },
]);
import { useMessage } from "naive-ui";
const message = useMessage();
const handleSelect = (key) => {

    let index = localStorage.getItem("templateIndex") || 0;
    router.push({ name: key, params: { index:index } });
  

};
const isCloseMenu = ref(false);
const screenResize = () => {
  window.addEventListener("resize", (e) => {
    if (router.currentRoute.value.name !== "edit") return;
    const screenWidth = window.innerWidth;
    if (screenWidth <= 600) isCloseMenu.value = true;
    else {
      isCloseMenu.value = false;
    }
  });
};

const route = useRoute();
watch(
  () => route.path,
  (newPath) => {
    isCloseMenu.value = newPath.includes("edit");
  }
);
onMounted(() => {
  // screenResize();
});
</script>

<style scoped lang="scss">
.top {
  padding: 0 10px;
  height: 60px;
  border: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  background: linear-gradient(145deg, rgba(66, 183, 225, 0.2) 0%, rgba(66, 183, 225, 0.7) 100%);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  position: relative;
  z-index: 10;
  flex-shrink: 0;
}

.open-menu {
  display: flex;
  margin: auto;
  .item {
    margin: 0 30px;
    cursor: pointer;
    display: flex;
    align-items: center;
    position: relative;
    transition: all 0.3s ease;
    padding: 8px 12px;
    border-radius: 6px;

    &:hover {
      transform: scale(1.2);

      .menu-icon {
        filter: drop-shadow(0 0 8px rgba(66, 183, 225, 0.6));
      }
      .menu-text {
        color: #0ea5e9;
        font-weight: 500;
      }
      background: rgba(255, 255, 255, 0.3);
      box-shadow: 0 4px 12px rgba(66, 183, 225, 0.2);

      &::after {
        content: "";
        position: absolute;
        bottom: -2px;
        left: 50%;
        transform: translateX(-50%);
        width: 40%;
        height: 2px;
        background: linear-gradient(90deg, #0ea5e9, #0284c7);
        border-radius: 1px;
        opacity: 1;
        transform-origin: center;
        animation: underline 0.5s ease forwards;
      }
    }
  }
}
svg {
  height: 24px;
  width: 24px;
  margin-right: 8px;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
}
.close-menu {
  height: 40px;
  width: 40px;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
}
.menu-text {
  font-size: 16px;
  color: #334155;
  transition: all 0.3s ease;
}

@keyframes underline {
  0% {
    width: 0;
    opacity: 0.5;
  }
  100% {
    width: 60%;
    opacity: 1;
  }
}
</style>
