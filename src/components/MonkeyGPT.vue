<script setup>
import logoUrl from "../assets/logo.png";
import { computed, onMounted, ref } from "vue";
import { getSimpleText } from "../support/simpleText";
import { getSearchKey } from "../support/searchEngine";
import { summarize, ask, search } from "../helper/chatHelper";
import { md2html } from "../support/markdown";

defineProps({
  msg: String,
});

const txt = ref("");
const loading = ref(false);
const canSearch = ref(false);

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

window.addEventListener("hashchange", () => {
  clear();
  autoSearch();
});

window.addEventListener("popstate", () => {
  clear();
  autoSearch();
});

autoSearch();

function autoSearch() {
  const searchKey = getSearchKey();
  canSearch.value = false;
  if (searchKey) {
    canSearch.value = true;
    chat(async () => {
      return (
        `### 以下是针对 "${searchKey}" 生成的结果 \n\n` +
        (await search(searchKey))
      );
    });
  }
}

const bodyShow = computed(() => loading.value || txt.value);
</script>

<template>
  <div :class="{ 'monkeygpt-warp': bodyShow }">
    <div class="monkeygpt-card">
      <div class="monkeygpt-header">
        <div class="nav" v-if="bodyShow">
          <h3 class="title">
            {{ msg }}
            <a href="https://github.com/weekend-project-space/monkey-gpt">
              <img
                src="https://img.shields.io/github/stars/weekend-project-space/monkey-gpt.svg?style=social&label=Stars"
                alt=""
            /></a>
          </h3>

          <svg
            class="close"
            @click="clear"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <div>
          <template v-if="canSearch">
            <button @click="autoSearch">生成</button>
            <button @click="chat(summarize)">总结本页面</button>
          </template>
          <template v-else>
            <button @click="getText">正文</button>
            <button @click="chat(summarize)">总结</button>
            <button @click="chat(ask)">回复</button>
          </template>
        </div>
      </div>
      <div v-if="txt || loading" class="monkeygpt-body">
        <svg
          v-if="loading"
          class="loading"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="0" fill="black">
            <animate
              attributeName="r"
              values="10;30;10"
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
        <div v-else-if="txt" v-html="txt"></div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.monkeygpt-body {
  margin-top: 1em;
}
.title {
  display: flex;
  align-content: center;
  margin-bottom: 1em;
}
.title img {
  margin-left: 1em;
}
.close {
  width: 1.5em;
  cursor: pointer;
}
.nav {
  display: flex;
  justify-content: space-between;
}
.loading {
  width: 3em;
}
</style>