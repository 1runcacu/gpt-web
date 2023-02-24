<template>
    <winUiVue :resizeAble="true" @close="closeWin" :width="WH" height="40vh" v-show="show"
        minWidth="500px" minHeight="500px" v-dom-resize="resizeFn"
    >
        <template #head>
          <div><b>{{title}}</b></div>
        </template>
        <div class="body">
            <vueChatVue :width="WH" class="right"/>
        </div>
    </winUiVue>
</template>

<script setup>
import { ref,defineProps } from 'vue';
import winUiVue from './win-ui.vue';
import vueChatVue from './vue-chat.vue';


const props = defineProps({
    show:{
        type:Boolean,
        default:true
    }
});

const title = ref("GPT-ROOM");

const WH = ref((window.innerWidth>500?500:window.innerWidth)+"px");// computed(()=>();

const resizeFn = el=>{
    WH.value = el.style.width;
}

</script>

<style scoped>
.body{
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
    align-items: stretch;
}
.left{
    border-right: 1px solid black;
}
.right{
    flex: 1;
}

.el-menu,.el-sub-menu,.el-menu-item-group,.el-menu-item,.el-collapse,.is-opend,
.el-collapse-item__header
{
    background-color: rgba(255,255,255,0) !important;
}
.el-collapse{
    --el-collapse-content-bg-color: rgba(255,255,255,0) !important;
}

</style>