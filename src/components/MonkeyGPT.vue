<script setup>
import logoUrl from "../assets/logo.png";
import { computed, onMounted, ref } from "vue";
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
  clear();
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

window.addEventListener("popstate", clear);

const bodyShow = computed(() => loading.value || txt.value);
</script>

<template>
  <div :class="{ 'monkeygpt-warp': bodyShow }">
    <div class="monkeygpt-card">
      <div class="monkeygpt-header">
        <h3 v-if="bodyShow">
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
          <button v-if="bodyShow" @click="clear">最小化</button>
        </div>
      </div>
      <div v-if="txt || loading" class="monkeygpt-body">
        <div v-if="loading" class="loader"></div>
        <div v-else-if="txt" v-html="txt"></div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.monkeygpt-body {
  margin-top: 1rem;
}
h3 {
  margin-bottom: 1rem;
}
</style>