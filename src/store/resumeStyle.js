import { defineStore } from "pinia";

export const useResumeStyleStore = defineStore("resumeStyle", {
  state: () => {
    return {
      resumeStyle: {
        fontSize: 16,
        fontFamily: "SimSun",
        lineHeight: 1.0,
        pagePadding: 30,
        themeColor: "rgba(0, 0, 0, 1)", // Default to black
      },
    };
  },
  //设置resumeStyle
  actions: {
    setResumeStyle(style) {
      this.resumeStyle = style;
    },
    resetResumeStyle() {
      this.resumeStyle = {
        fontSize: 16,
        fontFamily: "SimSun",
        lineHeight: 1.0,
        pagePadding: 30,
        themeColor: "rgba(0, 0, 0, 1)", // Default to black
      };
    },
  },
  persist: true,
});
