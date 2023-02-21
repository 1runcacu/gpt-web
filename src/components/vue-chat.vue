<template>
    <div id="chat">
        <div id="msg" class="box" ref="messageBox">
            <template v-for="(item,index) in List" :key="index">
                <div v-if="timerShow(item,index)" class="timer">{{new Date(parseInt(item.date)).toLocaleString()}}</div>
                <vueMsgVue :message="item.message" :uid="item.uid" :uuid="config.user.uid" />
            </template>
            <div ref="last"></div>
        </div>
        <div id="input">
            <textarea v-model="Msg" cols="2" rows="20" class="box" placeholder="请输入对话内容，ctrl+enter发送" @keydown.enter.native="keyDown"></textarea>
            <div class="bar">
                <el-button size="small" type="primary" @click="sendMessage">发送</el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { getCurrentInstance, inject,onMounted,onUnmounted,computed,ref,nextTick } from 'vue';
import vueMsgVue from './vue-msg.vue';

const ctx = getCurrentInstance().appContext.config.globalProperties;

const last = ref(null);
const messageBox = ref(null);

const message = data=>{
    const {rid,uid,event,frame} = data;
    switch(event){
        case "refresh":
            MessageList = frame.data;
            break;
        default:
            MessageList.push(frame);
            break;
    }
    RFS.value = ID();
}

const dt = 3*60*1000;

const timerShow = (item,index)=>{
    if(index===0)return true;
    let last = MessageList[index-1];
    return (parseInt(item.date)-parseInt(last.date))>=dt;
}

var ID = ()=>Date.now().toString(36);

const RFS = ref("");

let MessageList = [];

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


const sendMessage = ()=>{
    if(Msg.value){
        // chat("broadCast",{
        //     message:Msg.value
        // });
        if(/^[ \n\t]+$/g.test(Msg.value)){
            ctx.$message({type:"warning",message:"发送内容不为空哦~"});
        }else{
            Msg.value = "";
            ctx.$message({type:"success",message:"发送成功~"});
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
    height: 200px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: flex-start;
    padding: 10px;
}
#input>textarea{
    width: calc(100% - 20px);
    height: 120px;
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
    margin-top: 10px;
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