<template>
    <div id="chat">
        <div id="msg" class="box" ref="messageBox">
            <template v-for="(item,index) in List" :key="index">
                <div v-if="timerShow(item,index)" class="timer">{{new Date(parseInt(item.date)).toLocaleString()}}</div>
                <vueMsgVue :width="width" :message="item.message" :uid="item.uid" :uuid="config.user.uid" />
            </template>
            <div ref="last"></div>
        </div>
        <div id="input">
            <div class="bar">
                <el-button size="small" type="primary" @click="sendMessage">发送</el-button>
            </div>
            <textarea v-model="Msg" cols="2" rows="20" class="box" placeholder="请输入对话内容，ctrl+enter发送" @keydown.enter.native="keyDown"></textarea>
        </div>
    </div>
</template>

<script setup>
import { getCurrentInstance, inject,onMounted,onUnmounted,computed,ref,nextTick } from 'vue';
import vueMsgVue from './vue-msg.vue';
import Message from "@/api/message";
import {fetchUserID} from "@/api/util";

const ctx = getCurrentInstance().appContext.config.globalProperties;
const user = fetchUserID();
console.log(user)
const last = ref(null);
const messageBox = ref(null);
const config = ref({
    user:{
        uid:"USER"
    }
});

const props = defineProps({
    width:Number
});

const dt = 3*60*1000;

const timerShow = (item,index)=>{
    if(index===0)return true;
    let last = MessageList[index-1];
    return (parseInt(item.date)-parseInt(last.date))>=dt;
}

var ID = ()=>Date.now().toString(36);

const RFS = ref("");

let MessageList = [];

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
\`\`\``;

// for(let i=0;i<1;i++){
//     MessageList.push({
//         message:test,
//         uid:"CHATGPT",
//         date:Date.now(),
//     });
// }

const Msg = ref("");

const List = computed(()=>{
    RFS.value;
    nextTick(()=>{
        messageBox._value.scrollTop = last._value.offsetTop;
    });
    return MessageList;
});

const keyDown = (e)=>{
	if(e.ctrlKey && e.keyCode==13) {   //用户点击了ctrl+enter触发
        sendMessage();
	} 
}


const sendMessage = async ()=>{
    if(Msg.value){
        // chat("broadCast",{
        //     message:Msg.value
        // });
        if(/^[ \n\t]+$/g.test(Msg.value)){
            ctx.$message({type:"warning",message:"发送内容不为空哦~"});
        }else{
            ctx.$message({type:"success",message:"发送成功~"});
            MessageList.push({
                uid:"USER",
                message:Msg.value,
                date:Date.now()
            });
            RFS.value = ID();
            const req = Msg.value;
            Msg.value = "";
            const text = await Message.sendMessage(req).catch(err=>err);
            MessageList.push({
                uid:"CHATGPT",
                message:(typeof text==="string")?text:"error",
                date:Date.now()
            });
            RFS.value = ID();
        }
    }else{
        ctx.$message({type:"warning",message:"发送内容不为空哦~"});
    }
}

const chat = (event,frame={})=>{
    let {room:{rid},user:{uid}} = config.value;
    frame.uid = uid;
    frame.date = Date.now();
};


</script>

<style scoped>
#chat{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    overflow: hidden;
}
#msg{
    flex: 3;
    width: 100%;
    overflow-y: auto; 
}
#msg>.timer{
    text-align: center;
    border-bottom: 1px solid rgba(199, 199, 199, 0.733);
    margin-left: 5px;
}
#input{
    flex: 1;
    height: 120px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: flex-start;
    padding: 10px;
}
#input>textarea{
    width: calc(100% - 20px);
    height: 100%;
    resize: none;
    border-radius: .2rem;
    box-shadow: 1px 1px 3px gray;
}
#input>.bar{
    height: 20px;
    display: flex;
    width: calc(100% - 20px);
    padding-right: 20px;
    flex-direction: row-reverse;
    margin-bottom: 10px;
}

/* 滚动条和滑块 */
.box::-webkit-scrollbar,
.box::-webkit-scrollbar-thumb{ 
    width: 8px;
    height: 8px;
    border-radius: 10px;
}
/* 滑块背景色 */
.box::-webkit-scrollbar-thumb{
   background: #D2D5D9;
}
/* 其余相关样式设置跟滑块一个背景色 */
.box::-webkit-scrollbar,
.box::-webkit-scrollbar-corner,
.box::-webkit-resizer,
.box::-webkit-scrollbar-track,
.box::-webkit-scrollbar-track-piece{
    background: #EDF1F3;
}
/* 隐藏滚动条按钮 */
.box::-webkit-scrollbar-button{
    display: none;
}

</style>