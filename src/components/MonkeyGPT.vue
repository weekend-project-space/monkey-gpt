<script setup>
import logoUrl from "../assets/logo.png";
import { ref } from "vue";
import { getSimpleText } from "../support/simpleText";
import { summarize, ask } from "../helper/chatHelper";
import { md2html } from "../support/markdown";

defineProps({
  msg: String,
});

const txt = ref("");
const loading = ref(false);

function getText() {
  loading.value = true;
  txt.value = md2html(getSimpleText());
  loading.value = false;
}

async function chat(chatfun) {
  loading.value = true;
  try {
    txt.value = md2html(await chatfun(getSimpleText()));
  } catch {
    txt.value = "生成失败，请检查配置是否正确并刷新重试！";
  }
  loading.value = false;
}

function clear() {
  txt.value = "";
}
setTimeout(() => {
  console.log(GM_setValue, GM_getValue);
}, 3000);
window.addEventListener("popstate", clear);
</script>

<template>
  <div class="monkeygpt-header">
    <h3>
      {{ msg }}
      <a href="https://github.com/weekend-project-space/monkey-gpt">
        <img
          src="https://img.shields.io/github/stars/weekend-project-space/monkey-gpt.svg?style=social&label=Stars"
          alt=""
      /></a>
    </h3>
    <div>
      <button @click="getText">正文</button>
      <button @click="chat(summarize)">总结</button>
      <button @click="chat(ask)">回复</button>
      <button @click="clear">清空</button>
    </div>
  </div>
  <div v-if="txt || loading" class="monkeygpt-body">
    <div v-if="loading" class="loader"></div>
    <div v-else-if="txt" v-html="txt"></div>
  </div>
</template>


<style scoped>
.monkeygpt-header {
  /* position: sticky; */
  display: flex;
  top: 0;
  align-items: center;
  /* margin-bottom: 0.5rem; */
}
.monkeygpt-body {
  background: #fff;
  border-radius: 1rem;
  padding: 0.8rem;
  margin-top: 0.8rem;
}
.loader {
  margin: 0rem auto;
}

img {
  height: 1rem;
  margin: 0 0.5rem;
  display: inline-block;
}
h3 {
  margin-block-end: 0;
  margin-block-start: 0;
  margin-left: 0.6rem;
}
.card {
  padding: 0.8rem;
}
</style>