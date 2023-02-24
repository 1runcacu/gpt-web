<template>
  <div class="nav">
    <b>OPENAI - GPT</b>
    <div class="auto"></div>
    <el-button :icon="ChatDotRound" type="primary" @click="()=>consoleShow=true" size="large" circle/>
    <el-button :icon="Setting" type="info" @click="()=>consoleShow2=true" size="large" circle/>
    <div class="mr"></div>
  </div>
  <vueSearch />
  <vueMessage :show="consoleShow" @close="()=>consoleShow=false" />
  <vueSetting :show="consoleShow2" @close="()=>consoleShow2=false"/>
</template>

<script setup>
import vueMessage from '@/components/vue-message.vue';
import vueSetting from '@/components/vue-setting.vue';
import vueSearch from './components/vue-search.vue';
import { ChatDotRound, Setting } from '@element-plus/icons-vue';
import { ref } from 'vue';

const consoleShow = ref(false);
const consoleShow2 = ref(false);

</script>

<style>
html,body,#app{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: antiquewhite;
}
.nav{
  height: 60px;
  background-color: rgb(209,209,209);
  display: flex;
  align-items: center;
}
.nav>b{
  margin-left: 20px;
  font-family: Helvetica, "Trebuchet MS", Verdana, sans-serif;
}
.auto{
  margin-left: auto;
}
.mr{
  margin-right: 20px;
}
</style>
