<template>
  <div style="text-align: center">
    <n-avatar
      :src="avatarUrl"
      size="100"
      round
      @click="handleAvatarClick"
      style="cursor: pointer"
    />
    <n-upload
      ref="uploadRef"
      :action="uploadUrl"
      :show-file-list="false"
      :max="1"
      :accept="'image/*'"
      @finish="handleUploadFinish"
      style="display: none"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const uploadRef = ref(null)
const avatarUrl = ref('https://via.placeholder.com/100') // 默认头像
const uploadUrl = '/api/upload/avatar' // 替换成你后端的接口地址

function handleAvatarClick() {
  // 触发上传组件
  uploadRef.value?.submit()
  // 也可以手动点击上传 input（更兼容）：uploadRef.value?.$el.querySelector('input')?.click()
  const input = uploadRef.value?.$el?.querySelector('input')
  input && input.click()
}

function handleUploadFinish({ file, event }) {
  // 后端返回的头像 URL
  const response = JSON.parse(event.target.response)
  avatarUrl.value = response.url
}
</script>
