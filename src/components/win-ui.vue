<template>
    <transition name="drag-win">
      <div
        class="drag-dialog ban-select-font"
        ref="dragWin"
        v-resize="resizeAble"
        v-if="closeShow"
      >
        <div class="drag-bar" :style="headStyle" v-drag="dragAble" v-if="head=='true'">
            <slot name="head" />
            <div style="margin-left:auto;"></div>
            <el-icon @click="closehandle"><Minus /></el-icon>
            <el-icon  @click="fullScreen" v-if="resizeAble"><FullScreen /></el-icon>
            <el-icon class="close" @click="closehandle"><Close/></el-icon>
        </div>
        <div class="drag-main" :style="mainStyle">
          <slot/>
        </div>
      </div>
    </transition>
</template>

<script>
import { ElIcon } from 'element-plus';
import { FullScreen,Close,Minus} from '@element-plus/icons-vue'


const recordBox = {
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    fill: false
};

export default{
    name:'win-ui',
    components:{
        ElIcon,
        FullScreen,Close,Minus
    },
    props:{
        head:{
            type:String,
            default:"true"
        },
        width:{
            type:String,
            default:"300px"
        },
        height:{
            type:String,
            default:"40vh"
        },
        minWidth:{
            type:String,
            default:"400px"
        },
        minHeight:{
            type:String,
            default:"300px"
        },
        headHeight:{
            type:String,
            default:"35px"
        },
        headStyle:{
            type:String,
            default:""
        },
        mainStyle:{
            type:String,
            default:""
        },
        resizeAble:{
            type:Boolean,
            default:true
        },
        dragAble:{
            type:Boolean,
            default:true
        },
        closeShow:{
            type:Boolean,
            default:true
        },
        fullShow:{
            type:Boolean,
            default:true
        }
    },
    methods:{
        fullScreen(){
            const dragWin = this.$refs['dragWin'];
            const tmp = dragWin;
            const style = dragWin.style;
            // ???????????? ?????????????????????????????????????????????????????????????????????????????????false
            if (!style.width || style.width !== "100vw") {
                recordBox.fill = false;
            }
            // ??????????????????
            if (recordBox.fill) {
                style.width = `${recordBox.width}px`;
                style.height = `${recordBox.height}px`;
                style.top = `${recordBox.top}px`;
                style.left = `${recordBox.left}px`;
            } else {
                // ???????????????????????????
                recordBox.width = tmp.offsetWidth;
                recordBox.height = tmp.offsetHeight;
                recordBox.top = tmp.offsetTop;
                recordBox.left = tmp.offsetLeft;
                //????????????
                style.width = "100vw";
                style.height = "100vh";
                style.top = "0px";
                style.left = "0px";
            }
            recordBox.fill = !recordBox.fill; // ??????????????????
        },
        closehandle(){
            this.$emit("close",true);
        }
    }
}

</script>

  
<style>
.ban-select-font {
    -moz-user-select: none; /*??????*/
    -webkit-user-select: none; /*webkit?????????*/
    -ms-user-select: none; /*IE10*/
    -khtml-user-select: none; /*???????????????*/
    user-select: none;
}
</style>

<style scoped>
   /* ?????????????????? */


.drag-dialog {
    position: fixed;
    width: v-bind("width");
    height: v-bind("height");
    left: calc(50% - v-bind("width") / 2);
    top: calc(50% - v-bind("height") / 2);
    box-sizing: border-box;
    padding: 8px;
    overflow: hidden;
    color: #000;
    min-width: v-bind("minWidth");
    min-height: v-bind("minHeight");
    border: 1px solid black;
    border-radius:10px 0 10px 0;
    backdrop-filter: blur(5px);
    background-color: rgba(233, 237, 240, 0.8);
    box-shadow: rgb(204, 204, 204) 0px 0px 5px;
}
  
.drag-bar {
    width: 100%;
    cursor: move;
    height: v-bind("headHeight");
    border-bottom: 1px solid #000;
    box-sizing: border-box;
    display: flex;
    /* background-color: #919395; */
}

.el-icon{
    width: 25px;
    height: 25px;
    margin-left: 10px;
    /* line-height:25px;
    border-radius: 30px; */
    cursor: default;
    border-radius: .5rem;
}
.el-icon:hover,.el-icon:active{
    color: #E8E8E8;
    background-color: grey;
    transform: scale(1.2,1.2);
}
.close:hover,.close:active{
    background-color: #f2473e;
}

.drag-main {
    width: 100%;
    height: calc(100% - v-bind("headHeight"));
    box-sizing: border-box;
    overflow: hidden;
    font-size: 13px;
    line-height: 1.6;
    min-height: 30vh;
}
</style>