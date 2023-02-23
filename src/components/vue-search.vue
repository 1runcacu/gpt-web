<template>
    <div class="searchForm">
        <div class="header">
            <el-input 
                type="textarea"
                minlength="1"
                maxlength="512"
                show-word-limit
                :autosize="{ minRows: 6, maxRows: 6 }"
                class="input" placeholder="输入要搜索的内容" v-model="searchText"  
                :prefix-icon="Search"
                @keydown.enter.native="keyDown"
            />
            <el-button @click="search">点击搜索</el-button>
        </div>
        <div class="body">
            <textarea class="form-control result" id="chatgpt-response" 
            rows="26" resize="none" v-model="showText"
            style="resize: both; background-color: #f4f4f4; color: #333; border: 0px solid #ccc; border-radius: 12px;" readonly="true"></textarea>
        </div>
    </div>
</template>

<script setup>
import { getCurrentInstance,onMounted,ref } from 'vue';
import { Search } from '@element-plus/icons-vue';
// import { ChatGPTAPI } from 'chatgpt';
import { ElLoading } from 'element-plus'
// import ChatGPTAPI from "@/api/chatgpt";
import {sendMessage} from "@/api/message";

// import WebSocket from 'isomorphic-ws/browser';

const ctx = getCurrentInstance().appContext.config.globalProperties;
global.Buffer = global.Buffer || require('buffer').Buffer;

function wait(text="等待结果中"){
    return ElLoading.service({
        lock: true,
        text,
        background: 'rgba(0, 0, 0, 0.7)',
    })
}

const searchText = ref("js编写快速排序");



// const api = new ChatGPTAPI({ 
//     // endpoint: 'wss://api.chatgpt.com/v1/stream',
//     // WebSocket,
//     apiKey,
//     completionParams: {
//         temperature: 0.5,
//         top_p: 0.8
//     } 
// });

// const api = new ChatGPTAPI(apiKey);

const showText = ref("");
// console.log(api);

function write(response){
    // console.log(response);
    // const responseText = document.getElementById("chatgpt-response");
    if(typeof response !== "string")response = "error";
    showText.value = "";
    // responseText.innerHTML = ""
    let index = 0;
    const interval = setInterval(function() {
        showText.value += response[index];
        index++;
        if (index >= response.length) {
            clearInterval(interval);
        }
    }, 0);
}

const test = `\`\`\`js
function quickSort(arr) {\n
  if (arr.length <= 1) {\n
    return arr;
  }
  let left = [],
    right = [],
    baseDot = Math.round(arr.length / 2),
    base = arr.splice(baseDot, 1)[0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < base) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([base], quickSort(right));
}
function quickSort(arr) {\n
  if (arr.length <= 1) {\n
    return arr;
  }
  let left = [],
    right = [],
    baseDot = Math.round(arr.length / 2),
    base = arr.splice(baseDot, 1)[0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < base) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([base], quickSort(right));
}
function quickSort(arr) {\n
  if (arr.length <= 1) {\n
    return arr;
  }
  let left = [],
    right = [],
    baseDot = Math.round(arr.length / 2),
    base = arr.splice(baseDot, 1)[0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < base) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([base], quickSort(right));
}
\`\`\``

const search = async (e)=>{
    if(!searchText.value||/^[ \n\t]+$/g.test(searchText.value)){
        ctx.$message({type:"warning",message:"发送内容不为空哦~"});
    }else{
        const ld = wait();
        // console.log(searchText.value);//"js编写快速排序算法"
        // const res = await api.sendMessage(searchText.value,{
            
        // }).catch(err=>err);
        // const res = await api.search(searchText.value).catch(err=>err);
        const res = await sendMessage(searchText.value).catch(err=>err);
        ld.close();
        // console.log(res);
        write(res);
    }
}

const keyDown = (e)=>{
	if(e.ctrlKey && e.keyCode==13) {   //用户点击了ctrl+enter触发
        search();
	} 
}

onMounted(async ()=>{
    const ld = wait("初始化ChatGpt中");
    // await api.init();
    write(test);
    ld.close();
});

</script>
<style lang="scss">
.el-textarea {
    /*滚动条整体部分*/
    .el-textarea__inner::-webkit-scrollbar {
        width: 3px;
        height: 7px;
    }
    /*滚动条的轨道*/
    .el-textarea__inner::-webkit-scrollbar-track {
        background-color: #ffffff;
    }
    /*滚动条里面的小方块，能向上向下移动*/
    .el-textarea__inner::-webkit-scrollbar-thumb {
        background-color: rgba(144, 147, 153, 0.3);
        border-radius: 5px;
        border: 1px solid #f1f1f1;
        width: 4px;
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    }
    .el-textarea__inner::-webkit-scrollbar-thumb:hover {
        background-color: rgba(144, 147, 153, 0.3);
    }
    .el-textarea__inner::-webkit-scrollbar-thumb:active {
        background-color: rgba(144, 147, 153, 0.3);
    }
    /*边角，即两个滚动条的交汇处*/
    .el-textarea__inner::-webkit-scrollbar-corner {
        background-color: #ffffff;
    }
}

textarea{
    resize: none !important;
    border: 0px;
}

</style>

<style scoped>

/deep/ .el-input__wrapper{   /*或者 .s2>>>.el-input__inner  */
    border-radius: 12px;
    border: 0px;
    font-size: 32px;
    overflow: hidden;
}

.searchForm{
    width: 100%;
    height: 100%;
    background-color: rgba(246,246,246);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.header{
    margin-top: 25px;
    height: 200px;
    width: 100%;
    display: flex;
    align-items: stretch;
    justify-content: center;
}
.body{
    width: 76%;
    flex: 1;
    color: rgb(24, 1, 13);
}
.header>.el-button{
    margin-left: 0px;
    height: 136px;
}

.input{
    height: 120px;
    width: 70%;
    
}

.body{
    flex: 1;
    overflow: hidden;
}
.body>textarea{
    width: 100%;border: 0;height: 90%;
    white-space: pre-wrap; word-break:break-all;overflow:auto;
    font-size: 16px;
}


</style>