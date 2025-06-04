import { defineStore } from "pinia";

export const useModuleThStore = defineStore("moduleTh", {
  state: () => {
    return {
      allModules: ["基本信息", "教育经历", "实习/工作经历", "技能清单", "项目经历", "荣誉奖项", "自我评价"],
      haveModules: ["基本信息", "教育经历", "实习/工作经历", "技能清单", "项目经历", "荣誉奖项", "自我评价"],
      noModules: [],
      enterIndex: -1,
      haveModuleCount: 7,
    };
  },
  actions: {
    moveModule(startIndex, enterIndex) {
      this.enterIndex = enterIndex;
      this.haveModules.splice(enterIndex, 0, this.haveModules.splice(startIndex, 1)[0]);
    },
    addModule(moduleName) {
      this.haveModules.push(moduleName);
      this.noModules = this.noModules.filter((module) => module !== moduleName);
      this.haveModuleCount = this.haveModules.length;
    },
    deleteModule(moduleName) {
      this.haveModules = this.haveModules.filter((module) => module !== moduleName);
      this.noModules.push(moduleName);
      this.haveModuleCount = this.haveModules.length;
    },
  },
  persist: true,
});
