<template>
  <div class="header-container">
    <div style="text-align: center;">
      <n-avatar v-if="userInfo.fields[11].value" :size="100" :src="userInfo.fields[11].value" round />
    </div>
    <template v-for="(item, index) in userInfo.fields" :key="item.key">
      <div v-if="index !== 11" class="item">{{ item.label }}:{{ item.value }}</div>
    </template>
  </div>
</template>
<script setup>
const { userInfo } = defineProps({
  userInfo: {
    type: Object,
  },
});
</script>
<style scoped lang="scss">
.header-container {
  width: 200px;
  flex-shrink: 0;
  padding:10px 20px;
  margin-right:10px;
}
.item {
  margin-top: 10px;
}
</style>
