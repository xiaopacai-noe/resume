<template>
  <div class="template-container">
    <div
      class="template-card"
      ref="templatesRef"
      v-for="(template, index) in templates"
      :key="template.default"
      :class="{ active: index + 1 === curUseTemplateIndex }"
    >
      <div class="img-wrapper">
        <div v-if="!template.default" class="skeleton-loading"></div>
        <img
          v-else
          loading="lazy"
          :src="template.default"
          alt="template"
          @load="imageLoaded = true"
          @error="imageError = true"
        />

        <div class="select-btn" @click="selectTemplate(index)">选择</div>
      </div>
      <p class="template-title">{{ index > 2 ? "双栏" : "单栏" }} - 模板 {{ index + 1 }}</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const modules = import.meta.glob("../assets/images/template/*.png", { eager: true });
const templatesRef = ref();
const templates = Object.values(modules);
const curUseTemplateIndex = JSON.parse(localStorage.getItem("templateIndex")) || 0;
const selectTemplate = (index) => {
  localStorage.setItem("templateIndex", JSON.stringify(index + 1));
  router.push(`/edit/${Math.ceil((index + 1) / 3)}-${(index % 3) + 1}`);
};
onMounted(() => {
  templatesRef.value.forEach((item, index) => {
    setTimeout(() => {
      item.style.transition = `transform 0.3s ease ${index * 100}ms`;
      item.style.transform = `translateY(0px)`;
      item.style.filter = "blur(0px)";
      item.style.opacity = "1";
    });
  });
});
</script>

<style scoped lang="scss">
.template-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  padding: 60px 40px;
  margin: 20px auto;
  max-width: 1200px;
  background-color: #f9f9f9;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
   background: linear-gradient(135deg, #eaf5ff, #f9f9f9);  
}

.template-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
  position: relative;
  border: 2px solid transparent;

  &:hover {
    transition: all 0.3s !important;
    transform: translateY(-10px) scale(1.05) !important;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
    border-color: #409eff; // 🌟 添加高亮蓝色边框

    .select-btn {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
      &:hover {
        background: #0a9c86;
      }
    }
  }
}
.template-card {
  transform: translateY(200px);
  opacity: 0;
  filter: blur(10px);
}
.img-wrapper {
  position: relative;
  width: 280px;
  aspect-ratio: 210 / 297;
  padding: 10px;
  box-sizing: border-box;

  img {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 10px;
    transition: transform 0.3s ease;
    cursor: pointer;
  }

  .select-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.95);
    opacity: 0;
    transition: all 0.3s ease;
    padding: 8px 20px;
    background: #13d8a7;
    color: white;
    font-size: 14px;
    border: none;
    border-radius: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    width: 60%;
    text-align: center;
  }
}
.template-title {
  text-align: center;
  padding: 12px 0;
  font-size: 14px;
  color: #666;
  border-top: 1px solid #eee; // ✅ 添加上边框
  margin-top: 10px;
  cursor: pointer;
}
.active {
  border-color: #13d8a7;
  box-shadow: 0 0 0 3px rgba(19, 216, 167, 0.3);
  transform: translateY(-4px);
  transition: all 0.3s ease;
  position: relative;

  &::after {
    content: "✔ 当前使用";
    position: absolute;
    top: 8px;
    right: 8px;
    background: #13d8a7;
    color: white;
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
}
.skeleton-loading {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 100% 100%;
  animation: loading 1.5s infinite;
}
@keyframes loading {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
}
</style>
