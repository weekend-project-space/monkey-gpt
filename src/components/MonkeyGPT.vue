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
  <h3>{{ msg }}</h3>

  <div>
    <button @click="getText">正文</button>
    <button @click="chat(summarize)">总结</button>
    <button @click="chat(ask)">回复</button>
    <button @click="clear">清空</button>
    <div v-if="loading" class="loader"></div>
    <p v-else v-html="txt"></p>
  </div>
</template>


<style scoped>
.loader {
  margin: 1rem;
}
img {
  width: 1.2rem;
  margin-right: 0.5rem;
}
</style>